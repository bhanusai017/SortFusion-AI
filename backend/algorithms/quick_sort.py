import time
import tracemalloc


comparisons = 0
swaps = 0


def partition(arr, low, high):

    global comparisons
    global swaps

    pivot = arr[high]

    i = low - 1

    for j in range(low, high):

        comparisons += 1

        if arr[j] < pivot:

            i += 1

            arr[i], arr[j] = arr[j], arr[i]

            swaps += 1

    arr[i + 1], arr[high] = arr[high], arr[i + 1]

    swaps += 1

    return i + 1


def quick_sort_recursive(arr, low, high):

    if low < high:

        pi = partition(arr, low, high)

        quick_sort_recursive(arr, low, pi - 1)

        quick_sort_recursive(arr, pi + 1, high)


def quick_sort(arr):

    global comparisons
    global swaps

    comparisons = 0
    swaps = 0

    arr = arr.copy()

    tracemalloc.start()

    start_time = time.perf_counter()

    quick_sort_recursive(arr, 0, len(arr) - 1)

    end_time = time.perf_counter()

    current, peak = tracemalloc.get_traced_memory()

    tracemalloc.stop()

    return {
        "algorithm": "Quick Sort",
        "sorted_array": arr,
        "execution_time": round(end_time - start_time, 6),
        "memory_usage": round(peak / 1024, 2),
        "comparisons": comparisons,
        "swaps": swaps
    }