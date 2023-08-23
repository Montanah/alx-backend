#!/usr/bin/env python3
""" LFU Caching """

BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """ LFU Caching """

    def __init__(self):
        """ Constructor """
        super().__init__()
        self.frequency = {}

    def update_frequency(self, key):
        """ Update frequency of the given key """
        self.frequency[key] += 1

    def put(self, key, item):
        """ Add an item in the cache """
        if key and item:
            if key in self.cache_data:
                self.update_frequency(key)
            elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                min_freq_key = min(self.frequency, key=self.frequency.get)
                del self.cache_data[min_freq_key]
                del self.frequency[min_freq_key]
                print("DISCARD: {}".format(min_freq_key))
            self.cache_data[key] = item
            if key in self.frequency:
                self.update_frequency(key)
            else:
                self.frequency[key] = 1

    def get(self, key):
        """ Get an item by key """
        if key and key in self.cache_data:
            self.update_frequency(key)
            return self.cache_data[key]
        return None
