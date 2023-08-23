#!/usr/bin/env python3
""" LFU Caching """

BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """ LFU Caching """

    def __init__(self):
        """ Constructor """
        super().__init__()
        self.queue = []
        self.count = {}

    def put(self, key, item):
        """ Add an item in the cache """
        if key and item:
            if key in self.cache_data:
                self.queue.remove(key)
            elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                discard = self.queue.pop(0)
                del self.cache_data[discard]
                del self.count[discard]
                print("DISCARD: {}".format(discard))
            self.queue.append(key)
            self.cache_data[key] = item
            if key in self.count:
                self.count[key] += 1
            else:
                self.count[key] = 1

    def get(self, key):
        """ Get an item by key """
        if key and key in self.cache_data:
            self.queue.remove(key)
            self.queue.append(key)
            self.count[key] += 1
            return self.cache_data[key]
        return None
