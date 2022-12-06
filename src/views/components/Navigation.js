const Navigation = {
   render: () => {
      return `
         <nav class="gnb__nav">
            <ul>
                <li><a class="gnb__nav-item" href="/square" data-link>광장</a></li>
                <li><a class="gnb__nav-item" href="/" data-link>Home</a></li>
                <li><a class="gnb__nav-item" href="/chat" data-link>Chat</a></li>
                <li><a class="gnb__nav-item" href="/settings" data-link>Settings</a></li>
            </ul>
         </nav>
         `;
   },
   function: () => {
      console.log('nav function');
   },
};

export default Navigation;
