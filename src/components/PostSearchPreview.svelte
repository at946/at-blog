<script lang="ts">
    import { isSearchVisible } from "@/store/search";

    type Props = {
        slug: string
        title: string
        description: string
        category: string,
        tags: Array<string>
    }

    function closeSearchDialog() {
        isSearchVisible.set(false)
    }

    export let post: Props
    export let isLast: boolean = false
</script>

<div class="post-preview hover:bg-theme-primary">
    <div class="flex-1">
        <h4 class="post-preview__title">
            <a href={`/${post.category}/${post.slug}`} title={post.title} on:click={closeSearchDialog}>{post.title} &rarr;</a>
        </h4>
        <ul class="tag-list">
            {#each post.tags as tag}
                <a class="tag" href={`/tags/${tag}`} title={tag} on:click={closeSearchDialog}>{tag}</a>
            {/each}
        </ul>
    </div>
</div>
{#if !isLast}
    <hr class="my-4 text-theme-dark-secondary"/>
{/if}
<style lang="postcss">
    .post-preview {
        @apply  flex gap-6 text-left;
    }
    .post-preview__title {
        @apply text-lg leading-tight font-semibold text-white mb-2;
    }
    .post-preview__desc {
        @apply text-base text-theme-dark-primary leading-5 line-clamp-2;
    }
    .tag-list {
        @apply list-none py-2 flex flex-wrap gap-2;
    }
    .tag {
        @apply inline-block text-xs px-4 py-1 rounded-full text-theme-primary bg-theme-dark-primary;
    }
</style>
