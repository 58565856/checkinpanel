# -*- encoding: utf-8 -*-
"""
cron: */15 6-22/2 * * *
new Env('RSS 订阅');
"""

from datetime import datetime, timedelta

import feedparser

from notify_mtr import send
from utils_models import History, Rss, db


class RssRobot:
    def main(self):
        self.remove_old_history()
        rss_list = Rss.select()
        msg = ""
        post_url_list = [
            rss_history.url
            for rss_history in History.select().where(
                History.publish_at == datetime.today().strftime("%Y-%m-%d")
            )
        ]
        for rss in rss_list:
            rss_history_list = []
            feed = feedparser.parse(rss.feed)
            for entry in feed.entries:
                # print(entry["published"])
                if (
                    entry.link not in post_url_list
                    and (
                        datetime.now()
                        - datetime.strptime(entry["published"], rss.date_type)
                    ).days
                    < rss.before
                ):
                    msg = msg + f"{entry.title}\n{entry.link}\n\n"
                    rss_history_list.append(History(url=entry.link))

            with db.atomic():
                History.bulk_create(rss_history_list, batch_size=10)

        return msg

    def remove_old_history(self):
        # 只保留最近一周的记录
        week_date_range = datetime.now() + timedelta(days=-7)
        History.delete().where(
            History.publish_at < week_date_range.strftime("%Y-%m-%d")
        ).execute()


if __name__ == "__main__":
    res = RssRobot().main()
    send("RSS 订阅", res)
