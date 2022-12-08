const get = async (endpoint, params) => {
   const apiUrl = `${endpoint}/${params}`;
   return 'yet';
};

const post = async (endpoint, data) => {
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
};
export { get, post };
