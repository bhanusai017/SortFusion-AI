import numpy as np


class DatasetAnalyzer:

    @staticmethod
    def analyze(arr):

        n = len(arr)

        if n <= 1:
            return {
                "size": n,
                "sortedness": 100,
                "duplicate_ratio": 0,
                "reverse_sortedness": 0
            }

        # Sortedness Calculation
        ordered_pairs = 0

        for i in range(n - 1):
            if arr[i] <= arr[i + 1]:
                ordered_pairs += 1

        sortedness = (ordered_pairs / (n - 1)) * 100

        # Reverse Sortedness
        reverse_pairs = 0

        for i in range(n - 1):
            if arr[i] >= arr[i + 1]:
                reverse_pairs += 1

        reverse_sortedness = (reverse_pairs / (n - 1)) * 100

        # Duplicate Ratio
        unique_elements = len(set(arr))

        duplicate_ratio = (
            (n - unique_elements) / n
        ) * 100

        return {
            "size": n,
            "sortedness": round(sortedness, 2),
            "duplicate_ratio": round(duplicate_ratio, 2),
            "reverse_sortedness": round(reverse_sortedness, 2)
        }