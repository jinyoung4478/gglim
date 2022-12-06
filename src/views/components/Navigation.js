const Navigation = {
   template: () => {
      return `
         <nav class="gnb__nav">
            <ul>
                <li><a class="gnb__nav-item" href="/" data-link>광장</a></li>
                <li><a class="gnb__nav-item" href="/street" data-link>골목</a></li>
                <li><a class="gnb__nav-item" href="/chat" data-link>채팅</a></li>
                <li><a class="gnb__nav-item" href="/store" data-link>상점</a></li>
                <li><a class="gnb__nav-item" href="/settings" data-link>설정</a></li>
            </ul>
         </nav>
         `;
   },
   script: () => {},
};

export default Navigation;
