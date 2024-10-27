import{av as u,aw as f,j as o,r as i,a as G,v as L,u as U,bH as l,B as j,S as J,F as K,P as Q,bI as W,bJ as X}from"./index-nP3sWgOM.js";import{G as Z}from"./GetToAction-p5I7uB52.js";import{u as ee}from"./useUser-xy9w6s-p.js";import{l as oe}from"./lodash-CeyOGm4C.js";import{h as ae}from"./moment-G82_0lEo.js";import{D as te}from"./DataTable-BAyMAVN6.js";import{B as re}from"./Button-DYMAArme.js";import{T as ie}from"./TextField-Btu36Zmo.js";import{a as m}from"./InputLabel-DaDe49tm.js";import"./MenuItem-vSBr2iRT.js";import"./Autocomplete-Cb93hnIo.js";import"./Close-CYbAYMXT.js";import"./Checkbox-CVXqhyuK.js";import"./Skeleton-DY2pMhD5.js";import"./colorManipulator-BTVsESXO.js";import"./useThemeProps-Cp5GSgP0.js";var p={},se=f;Object.defineProperty(p,"__esModule",{value:!0});var z=p.default=void 0,le=se(u()),ne=o;z=p.default=(0,le.default)((0,ne.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"}),"Edit");var g={},de=f;Object.defineProperty(g,"__esModule",{value:!0});var N=g.default=void 0,ce=de(u()),me=o;N=g.default=(0,ce.default)((0,me.jsx)("path",{d:"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3m3-10H5V5h10z"}),"Save");var h={},ue=f;Object.defineProperty(h,"__esModule",{value:!0});var b=h.default=void 0,fe=ue(u()),pe=o;b=h.default=(0,fe.default)((0,pe.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12z"}),"Cancel");const ye=w=>{var C;const{view:v}=w,a=ee(),[P,D]=i.useState({open:!1,onClose:()=>D({...P,open:!1})}),[M,x]=i.useState({page:0,pageSize:10}),[O,y]=i.useState(""),t=G(),R=L(),{rooms:s,loading:I,error:ge}=U(e=>e.hotelAdminRooms),[n,d]=i.useState(null),[_,S]=i.useState({}),E=e=>{S(r=>({...r,[n]:e.target.value}))},A=e=>{const r=new FormData;r.append("totalNoOfRooms",_[n]),console.log(`Updated totalNoOfRooms for row ${e._id}`),t(W({formData:r,id:e._id})).then(c=>{const{requestStatus:V}=c.meta;V==="fulfilled"&&t(l({id:a==null?void 0:a._id,page:1,page_size:10}))}).catch(c=>{console.error("Error creating room:",c)}),d(null)};i.useEffect(()=>{t(l({id:a==null?void 0:a._id,page:1,page_size:10}))},[t,a==null?void 0:a._id]);const $=()=>{R("/rooms/create")},k=e=>{R(`/rooms/update/${e}`)},B=e=>{t(X({id:e})).then(()=>{t(l({page:1,page_size:10}))})},H=[{field:"area",headerName:"Room Size ",flex:1},{field:"bedSize",headerName:"Bed Size ",flex:1},{field:"price",headerName:"Price ",flex:1},{field:"offerPrice",headerName:"OfferPrice ",flex:1},{field:"totalNoOfRooms",headerName:"Number Of Rooms ",flex:1},{field:"createdAt",headerName:"Added Date",flex:1,renderCell:e=>ae(e.value).format("DD/MM/YYYY")},{field:"roomCategoryId",headerName:"Room Category",flex:1,renderCell:e=>e.value.name},{field:"_id",headerName:"Action",flex:1,renderCell:e=>Z(e.value,k,B)}],q=[{field:"price",headerName:"Price ",flex:1},{field:"area",headerName:"Room Size ",flex:1},{field:"offerPrice",headerName:"OfferPrice ",flex:1},{field:"totalNoOfRooms",headerName:"Rooms",flex:1,renderCell:e=>n===e.row._id?o.jsx(ie,{sx:{mt:.5},type:"number",value:_[e.row._id]||e.value,onChange:E,size:"small"}):e.value},{field:"actions",headerName:"Actions",flex:1,renderCell:e=>n===e.row._id?o.jsxs(o.Fragment,{children:[o.jsx(m,{title:"Save",onClick:()=>A(e.row),children:o.jsx(N,{})}),o.jsx(m,{title:"Cancle",onClick:()=>d(null),children:o.jsx(b,{})})]}):o.jsx(m,{title:"Edit",onClick:()=>{d(e.row._id),S(r=>({...r,[e.row._id]:e.row.totalNoOfRooms}))},children:o.jsx(z,{})})}],T=e=>{e.pageSize==M.pageSize?(t(l({page:e.page+1,page_size:e.pageSize})),x(e)):(t(l({page:e.page,page_size:e.pageSize})),x({page:1,pageSize:e.pageSize}))},F=i.useCallback(oe.debounce(e=>{t(l({page:1,page_size:10,search:e}))},1e3),[]),Y=e=>{const r=e.target.value;y(r),F(r)};return o.jsxs("div",{children:[v!="dashboard"&&o.jsxs(j,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2},children:[o.jsx(j,{children:o.jsx(J,{value:O,handleSearchChange:Y})}),o.jsx(re,{sx:{borderRadius:2},variant:"outlined",color:"secondary",size:"large",onClick:$,startIcon:o.jsx(K,{size:14}),children:"Rooms"})]}),o.jsx(Q,{children:o.jsx(te,{data:s==null?void 0:s.rooms,columns:v==="dashboard"?q:H,getRowId:e=>e._id,loading:I,initialState:{pagination:{paginationModel:{pageSize:10}}},rowCount:(C=s==null?void 0:s.rooms)==null?void 0:C.length,paginationMode:"server",onPaginationModelChange:T,pageSizeOptions:[10],disableRowSelectionOnClick:!0})})]})};export{ye as default};