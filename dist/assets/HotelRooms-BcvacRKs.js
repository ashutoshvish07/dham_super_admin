import{r as t,a as P,v as b,u as A,J as r,j as a,B as m,S as y,F as M,P as _,K as B}from"./index-nP3sWgOM.js";import"./index.esm-B2q6Cw9c.js";import{G as T}from"./GetToAction-p5I7uB52.js";import{A as w}from"./Dialog-D7RuuEns.js";import{l as I}from"./lodash-CeyOGm4C.js";import{h as O}from"./moment-G82_0lEo.js";import{D as k}from"./DataTable-BAyMAVN6.js";import{B as E}from"./Button-DYMAArme.js";import"./InputLabel-DaDe49tm.js";import"./TextField-Btu36Zmo.js";import"./MenuItem-vSBr2iRT.js";import"./index-CcBqUUtn.js";import"./DialogContent-CAWl_w7U.js";import"./Autocomplete-Cb93hnIo.js";import"./Close-CYbAYMXT.js";import"./Checkbox-CVXqhyuK.js";import"./Skeleton-DY2pMhD5.js";import"./colorManipulator-BTVsESXO.js";import"./useThemeProps-Cp5GSgP0.js";const le=()=>{var p;const[c,Y]=t.useState(""),[g,F]=t.useState(null),[l,f]=t.useState({open:!1,onClose:()=>f({...l,open:!1})}),[u,n]=t.useState({page:0,pageSize:10}),[h,x]=t.useState(""),o=P(),d=b(),{rooms:s,loading:S,error:G}=A(e=>e.hotel);t.useEffect(()=>{o(r({page:1,page_size:10}))},[o]);const z=()=>{d("/hotel/rooms/create")},C=e=>{d(`/hotel/rooms/update/${e}`)},R=e=>{o(B({id:e})).then(()=>{o(r({page:1,page_size:10}))})},v=[{field:"userId",headerName:"Hotel Name ",renderCell:e=>{var i;return(i=e.value)==null?void 0:i.name},flex:1},{field:"area",headerName:"Room Size ",flex:1},{field:"bedSize",headerName:"Bed Size ",flex:1},{field:"price",headerName:"Price ",flex:1},{field:"offerPrice",headerName:"OfferPrice ",flex:1},{field:"totalNoOfRooms",headerName:"Number Of Rooms ",flex:1},{field:"createdAt",headerName:"Added Date",flex:1,renderCell:e=>O(e.value).format("DD/MM/YYYY")},{field:"roomCategoryId",headerName:"Room Category",flex:1,renderCell:e=>e.value.name},{field:"_id",headerName:"Action",flex:1,renderCell:e=>T(e.value,C,R)}],N=e=>{e.pageSize==u.pageSize?(o(r({page:e.page+1,page_size:e.pageSize})),n(e)):(o(r({page:e.page,page_size:e.pageSize})),n({page:1,pageSize:e.pageSize}))},j=t.useCallback(I.debounce(e=>{o(r({page:1,page_size:10,search:e}))},1e3),[]),D=e=>{const i=e.target.value;x(i),j(i)};return a.jsxs("div",{children:[a.jsx(w,{title:c,content:g,dialogProps:l}),a.jsxs(m,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2},children:[a.jsx(m,{children:a.jsx(y,{value:h,handleSearchChange:D})}),a.jsx(E,{sx:{borderRadius:2},variant:"outlined",color:"secondary",size:"large",onClick:z,startIcon:a.jsx(M,{size:14}),children:"Rooms"})]}),a.jsx(_,{children:a.jsx(k,{data:s==null?void 0:s.rooms,columns:v,getRowId:e=>e._id,loading:S,initialState:{pagination:{paginationModel:{pageSize:10}}},rowCount:(p=s==null?void 0:s.rooms)==null?void 0:p.length,paginationMode:"server",onPaginationModelChange:N,pageSizeOptions:[10],disableRowSelectionOnClick:!0})})]})};export{le as default};