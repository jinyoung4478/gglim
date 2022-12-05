const Navigation = () => {
   return `
    <nav class="nav">
        <a href="/square" class="nav_item" data-link>Square</a>
        <a href="/" class="nav_item" data-link>Home</a>
        <a href="/posts" class="nav_item" data-link>Posts</a>
        <a href="/settings" class="nav_item" data-link>Settings</a>
        <a href="/err" class="nav_item" data-link>Not Found</a>
    </nav>
    `;
};

export default Navigation;
