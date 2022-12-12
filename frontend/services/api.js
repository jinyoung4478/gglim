async function get(endpoint, params = '') {
   const apiUrl = `${endpoint}/${params}`;
   console.log(`%cGET 요청: ${apiUrl} `, 'color: #a25cd1;');

   const token = sessionStorage.getItem('token');
   const res = await fetch(apiUrl, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

   // 응답 코드가 4XX 계열일 때 (400, 403 등)
   // if (!res.ok) {
   //    const errorContent = await res.json();
   //    const { reason } = errorContent;

   //    throw new Error(reason);
   // }

   const result = await res.json();

   return result;
}

async function post(endpoint, data) {
   const apiUrl = endpoint;

   const bodyData = JSON.stringify(data);
   console.log('POST REQ :', bodyData);
   const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: bodyData,
   });

   const result = await res.json();
   return result;
}
export { get, post };
