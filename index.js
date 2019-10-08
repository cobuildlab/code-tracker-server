const express = require('express');
const app = express();
var cors = require('cors');
const port = 5000;
const axios = require('axios');
const URL = `https://code-tracker.auth0.com`;
const jwtDecode = require('jwt-decode');

app.use(cors());
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/auth', async (req, res) => {
  const token = req.param('token');
  console.log(`DEBUG:`, token);
  // let decodeToken = jwtDecode(token);
  // console.log(`DEBUG:`, decodeToken);
  const newToken = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJURTNOVFF5T0VRMk56WTROVGN4UVVRMVJEZ3hRVVl3UkRGRk5FRkROa0k0UlVOR05EZ3dSZyJ9.eyJpc3MiOiJodHRwczovL2NvZGUtdHJhY2tlci5hdXRoMC5jb20vIiwic3ViIjoieGE3bDdFUGNmYzBjZW1tYVBEZ05FMGRsM2xjVkhvVUJAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vY29kZS10cmFja2VyLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTcwNDkwOTcxLCJleHAiOjE1NzA1NzczNzEsImF6cCI6InhhN2w3RVBjZmMwY2VtbWFQRGdORTBkbDNsY1ZIb1VCIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.HJNia1K2SIVEHtJ9h86NHQu7n9qOUGRPdNI2jH4-iSaboO_MZmSUEVjWPrnchYySk9nIqFRY8Whi7Z_RBU5ar1UGEsGDcL8xEBWSUxR8yFL0DGZmEAa3FnJKEeQveotXAzoR5tNNIJ70nABvJuMxqM0XmKBp-kGSUqVH49-zyKZcFlqHFV056yJiRoA6EdqinGBE0ImWB_-zm8-Nzv-ceOKeuG03qYHuQPstbc11BuiiYp4KqoSSPGPye1Q-sKxEnpCzrfUlrtLVV5nt8iYbkLkaf4nZO0_LJHz01KiFij-17jsbha0l4N_UcGBzzegFAYZ3jonJj3D9uT5g81IRaw`;

  const headers = {
    'Content-type': 'application/json',
    'authorization': `Bearer ${newToken}`
  };

  const options = {
    method: 'get',
    url: `${URL}/api/v2/users/${token}`,
    headers
  };
  const reqOptions = {
    ...options,
    // data
  };
  //
  let accessToken = null;
  try {
    const res = await axios(reqOptions);
    console.log("GOOD:", res.data);
    console.log("GOOD:", res.data.identities);
    console.log("GOOD:", res.data.identities[0]);
    accessToken = res.data.identities[0].access_token;
  } catch (e) {
    console.error('ERROR:', String(e));
    return res.json({token});
  }

  console.log(`DEBUG:accessToken`, accessToken);


  const gitHubOptions = {
    url: 'https://api.github.com/events',
    headers: {
      'Content-type': 'application/json',
      'authorization': `token ${accessToken}`
    }
  };
  try {
    const resG = await axios(gitHubOptions);
    console.log("GOOD:", resG.data);
    return res.json(resG.data);
  } catch (e) {
    console.error('ERROR:', String(e));
    return res.json({token});
  }

  return res.json({token});

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
