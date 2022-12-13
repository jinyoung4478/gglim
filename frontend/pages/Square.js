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
                  <div class="square-table-list">
                     <div class="square-table">
                        <h3>아무나 오세요 (3/5)</h3>
                     </div>
                     <div class="square-table">
                        <h3>아무나 오세요 (2/5)</h3>
                     </div>
                     <div class="square-table">
                        <h3>심심한 사람? (1/4)</h3>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      `;
   },
   script: () => {},
};

export default Square;
