import time
import tracemalloc


def insertion_sort(arr):

    arr = arr.copy()

    comparisons = 0
    swaps = 0

    tracemalloc.start()

    start_time = time.perf_counter()

    for i in range(1, len(arr)):

        key = arr[i]

        j = i - 1

        while j >= 0 and arr[j] > key:

            comparisons += 1

            arr[j + 1] = arr[j]

            swaps += 1

            j -= 1

        arr[j + 1] = key

    end_time = time.perf_counter()

    current, peak = tracemalloc.get_traced_memory()

    tracemalloc.stop()

    return {
        "algorithm": "Insertion Sort",
        "sorted_array": arr,
        "execution_time": round(end_time - start_time, 6),
        "memory_usage": round(peak / 1024, 2),
        "comparisons": comparisons,
        "swaps": swaps
    }