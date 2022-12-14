const Square = {
   template: () => {
      return `
         <div class="square-container">
            <div class="square-wrapper">
               <div class="square-header">
                  <h1>[광장] 테이블에 앉아 사람들이 저마다 대화를 나누고있다.</h1>
               </div>
            </div>
            <div class="square-wrapper">
               <div class="square-street">
                  <h2>테이블 목록</h2>
                  <div class="square-table-list" data-id="table">
                  </div>
               </div>
            </div>
         </div>
      `;
   },
   script: () => {
      const tableElem = document.querySelector("[data-id='table']");
      const data = [
         { title: '심심한 사람?', nowMember: 4, fullMember: 5 },
         { title: '심심한 사람?', nowMember: 4, fullMember: 5 },
         { title: '잡담', nowMember: 2, fullMember: 5 },
         { title: '심심한 사람~~?', nowMember: 5, fullMember: 5 },
      ];
      tableElem.innerHTML += data.map(
         room => `
      <div class="square-table ${room.nowMember === room.fullMember ? 'square-table-full' : ''}">
         <h3>${room.title} (${room.nowMember}/${room.fullMember})</h3>
      </div>
      `,
      );
      const socket = io();
      console.log(socket);
      // function handleMessageSubmit(e) {
      //    e.preventDefault();
      //    socket.emit('newMessage', messageInput.value, roomName, () => {
      //       addMessage(`You: ${messageInput.value}`);
      //       messageInput.value = '';
      //       messageInput.focus();
      //    });
      // }
      // socket.on('welcome', (user, newCount) => {
      //    roomTitle.innerText = `Room: ${roomName} (${newCount})`;
      //    addMessage(`${user} arrived!`);
      // });
   },
};

export default Square;
