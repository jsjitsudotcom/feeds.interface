find ./build -type f -exec gzip -9 "{}" \; -exec mv "{}.gz" "{}" \; 