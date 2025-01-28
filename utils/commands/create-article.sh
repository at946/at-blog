#!/bin/bash

directory=src/content/blog/$(date "+%Y%m%d")-XX
file=$directory/index.mdoc
mkdir -p $directory
touch $file
cat > $file <<EOL
---
title:
tags:
  - Articles
  - Slides
publicationDate: $(date "+%Y-%m-%d")
---

EOL