class AdaptiveSelector:

    @staticmethod
    def choose_algorithm(metrics):

        size = metrics["size"]
        sortedness = metrics["sortedness"]
        reverse_sortedness = metrics["reverse_sortedness"]

        # Small datasets
        if size <= 20:

            return {
                "algorithm": "Insertion Sort",
                "confidence": 96,
                "reason":
                "Small datasets perform efficiently with Insertion Sort."
            }

        # Nearly sorted datasets
        elif sortedness >= 80:

            return {
                "algorithm": "Merge + Insertion Hybrid",
                "confidence": 93,
                "reason":
                "Dataset is nearly sorted, ideal for adaptive merging."
            }

        # Reverse sorted datasets
        elif reverse_sortedness >= 80:

            return {
                "algorithm": "Heap Sort",
                "confidence": 91,
                "reason":
                "Reverse ordering detected. Heap Sort avoids worst-case degradation."
            }

        # Large datasets
        elif size >= 1000:

            return {
                "algorithm": "Quick + Heap Hybrid",
                "confidence": 95,
                "reason":
                "Large dataset optimized using hybrid partitioning strategy."
            }

        # Default
        else:

            return {
                "algorithm": "Quick Sort",
                "confidence": 88,
                "reason":
                "Quick Sort selected for balanced average-case performance."
            }