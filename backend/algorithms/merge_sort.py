import time
import tracemalloc


comparisons = 0


def merge(arr, left, mid, right):

    global comparisons

    left_part = arr[left:mid + 1]
    right_part = arr[mid + 1:right + 1]

    i = 0
    j = 0
    k = left

    while i < len(left_part) and j < len(right_part):

        comparisons += 1

        if left_part[i] <= right_part[j]:

            arr[k] = left_part[i]
            i += 1

        else:

            arr[k] = right_part[j]
            j += 1

        k += 1

    while i < len(left_part):

        arr[k] = left_part[i]
        i += 1
        k += 1

    while j < len(right_part):

        arr[k] = right_part[j]
        j += 1
        k += 1


def merge_sort_recursive(arr, left, right):

    if left < right:

        mid = (left + right) // 2

        merge_sort_recursive(arr, left, mid)

        merge_sort_recursive(arr, mid + 1, right)

        merge(arr, left, mid, right)


def merge_sort(arr):

    global comparisons

    comparisons = 0

    arr = arr.copy()

    tracemalloc.start()

    start_time = time.perf_counter()

    merge_sort_recursive(arr, 0, len(arr) - 1)

    end_time = time.perf_counter()

    current, peak = tracemalloc.get_traced_memory()

    tracemalloc.stop()

    return {
        "algorithm": "Merge Sort",
        "sorted_array": arr,
        "execution_time": round(end_time - start_time, 6),
        "memory_usage": round(peak / 1024, 2),
        "comparisons": comparisons
    }