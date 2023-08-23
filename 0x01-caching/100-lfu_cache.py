#!/usr/bin/env python3
""" LFU Caching """

BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """ LFU Caching """

    def __init__(self):
        """ Constructor """
        super().__init__()
        self.frequency = {}
        self.frequency_list = {}

    def update_frequency_list(self, key):
        """ Update frequency list for the given key """
        freq = self.frequency[key]
        self.frequency_list[freq].remove(key)
        if not self.frequency_list[freq]:
            del self.frequency_list[freq]

        freq += 1
        self.frequency[key] = freq
        if freq not in self.frequency_list:
            self.frequency_list[freq] = []
        self.frequency_list[freq].append(key)

    def put(self, key, item):
        """ Add an item in the cache """
        if key and item:
            if key in self.cache_data:
                self.cache_data[key] = item
                self.update_frequency_list(key)
            else:
                if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                    min_freq = min(self.frequency_list)
                    remove_key = self.frequency_list[min_freq].pop(0)
                    del self.cache_data[remove_key]
                    del self.frequency[remove_key]
                self.cache_data[key] = item
                self.frequency[key] = 1
                if 1 not in self.frequency_list:
                    self.frequency_list[1] = []
                self.frequency_list[1].append(key)

    def get(self, key):
        """ Get an item by key """
        if key and key in self.cache_data:
            self.update_frequency_list(key)
            return self.cache_data[key]
        return None
