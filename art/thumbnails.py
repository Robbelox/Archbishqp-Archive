import os
from PIL import Image

# Change this to your folder path if needed
folder_path = "."

# Maximum size for the longest dimension
max_size = 180

# Supported image extensions
image_extensions = ('.png', '.jpg', '.jpeg', '.bmp', '.gif', '.tiff', '.webp')

for filename in os.listdir(folder_path):
    if filename.lower().endswith(image_extensions):
        full_path = os.path.join(folder_path, filename)

        # Open image
        with Image.open(full_path) as img:
            # Calculate the new size preserving aspect ratio
            img.thumbnail((max_size, max_size), Image.LANCZOS)

            # Construct new filename
            name, ext = os.path.splitext(filename)
            new_filename = f"{name}-thumbnail{ext}"
            new_path = os.path.join(folder_path, new_filename)

            # Save thumbnail
            img.save(new_path)

            print(f"Thumbnail saved as: {new_filename}")
