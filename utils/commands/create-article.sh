#!/bin/bash

slug=$1
date=$(date "+%Y%m%d")

directory=src/content/blog/${date}-${slug}
file=$directory/index.mdoc

mkdir -p $directory
cat > $file <<EOL
---
title:
type: blog | slide | video
publicationDate: $(date "+%Y-%m-%d")
---

EOL