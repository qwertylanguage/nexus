import os
import zipfile

def make_zip():
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    out_dir = os.path.join(root_dir, 'public')
    os.makedirs(out_dir, exist_ok=True)
    zip_path = os.path.join(out_dir, 'nexus-platform-source.zip')

    ignored_dirs = {'.git', 'node_modules', 'dist', '.vite', '.cache', '__pycache__'}
    ignored_extensions = {'.pyc'}

    count = 0
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for dirpath, dirnames, filenames in os.walk(root_dir):
            # Prune ignored directories
            dirnames[:] = [d for d in dirnames if d not in ignored_dirs and not d.startswith('.')]
            
            for file in filenames:
                if any(file.endswith(ext) for ext in ignored_extensions):
                    continue
                if file == 'nexus-platform-source.zip':
                    continue

                full_path = os.path.join(dirpath, file)
                rel_path = os.path.relpath(full_path, root_dir)
                zipf.write(full_path, rel_path)
                count += 1

    print(f"Successfully archived {count} files to {zip_path} (size: {os.path.getsize(zip_path)} bytes)")

if __name__ == '__main__':
    make_zip()
