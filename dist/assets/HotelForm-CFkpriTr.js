import{a as ue,a0 as he,v as ye,u as se,r as P,ao as fe,ap as Ie,j as o,L as xe,G as n,a3 as ge,n as be,aq as je,ar as Ae,B as Te,h as Ce,q as _e,l as Pe,E as qe,M as Be,aj as we,as as Fe}from"./index-nP3sWgOM.js";import{u as Se}from"./formik.esm-Dyqt8FN9.js";import{c as Ee,a as p,d as ae,e as Le}from"./index.esm-B2q6Cw9c.js";import{I as ze}from"./ImageUpload-B33Abahr.js";import{A as f}from"./AutoComplete-OgZ3j4BA.js";import{I as Ve}from"./index-BYu15YCe.js";import{a as We,I as Me}from"./InputLabel-DaDe49tm.js";import{T as l,S as ve}from"./TextField-Btu36Zmo.js";import{M as He}from"./MenuItem-vSBr2iRT.js";import{C as $e}from"./Checkbox-CVXqhyuK.js";import{B as Ke}from"./Button-DYMAArme.js";import"./index-CcBqUUtn.js";import"./Autocomplete-Cb93hnIo.js";import"./Close-CYbAYMXT.js";const dr=({type:Ne,dialogProps:Oe,hotle_data:Re})=>{var B,w,F,S,E,L,z,V,W,M,v,H,$,K,N,O,R,k,D,G,U,J;const s=ue(),{id:m}=he(),j=ye(),{amenities:c,properties:A,foodAndDining:I,hotelData:t,loading:le}=se(r=>r.hotel);console.log("foodAndDining",I);const[ce,q]=P.useState({name:"",email:"",mobile:"",password:"",countryId:"",stateId:"",cityId:"",propertyTypeId:"",address:"",pincode:"",price:"",offerPrice:"",amenities:[],foodAndDiningId:""}),[x,g]=P.useState([]),{countries:T,states:C,cities:_}=se(r=>r.location);P.useEffect(()=>{(async()=>{try{await Promise.all([s(Ce({page:1,page_size:10})),s(_e({page:1,page_size:10})),s(Pe({page:1,page_size:10})),s(qe({page:1,page_size:10})),s(Be({page:1,page_size:10})),s(we({page:1,page_size:10}))]),m?s(Fe({id:m})).then(d=>{var u,h,y;const{data:i}=d==null?void 0:d.payload;q({name:(i==null?void 0:i.name)||"",email:(i==null?void 0:i.email)||"",mobile:(i==null?void 0:i.mobile)||"",countryId:((u=i==null?void 0:i.countryId)==null?void 0:u.name)||"",stateId:((h=i==null?void 0:i.stateId)==null?void 0:h.name)||"",cityId:((y=i==null?void 0:i.cityId)==null?void 0:y.name)||"",propertyTypeId:(i==null?void 0:i.propertyTypeId)||"",address:(i==null?void 0:i.address)||"",pincode:(i==null?void 0:i.pincode)||"",price:(i==null?void 0:i.price)||"",offerPrice:(i==null?void 0:i.offerPrice)||"",amenities:(i==null?void 0:i.amenitiesId)||[],foodAndDiningId:(i==null?void 0:i.foodAndDiningId)||""}),g(i.files)}):(q({name:"",email:"",mobile:"",password:"",countryId:"",stateId:"",cityId:"",propertyTypeId:"",address:"",pincode:"",price:"",offerPrice:"",amenities:[],foodAndDiningId:""}),g([]))}catch(d){console.error("Error fetching data:",d)}})()},[s,m]);const pe=r=>{g(r)},me=r=>{g(x.filter(d=>d!==r))},e=Se({initialValues:ce,enableReinitialize:!0,validationSchema:Ee({name:p().min(2,"Name must be at least 2 characters").max(50,"Name cannot exceed 50 characters").required("Name is required"),email:p().email("Invalid email format").required("Email is required"),mobile:p().matches(/^[0-9]{10}$/,"Mobile number must be exactly 10 digits").required("Mobile number is required"),password:p().min(8,"Password must be at least 8 characters"),address:p().min(10,"Address must be at least 10 characters").required("Address is required"),pincode:p().matches(/^[1-9][0-9]{5}$/,"Pincode must be a valid 6-digit number").required("Pincode is required"),price:ae().min(1,"Price must be greater than 0").required("Price is required"),offerPrice:ae().min(1,"Offer price must be greater than 0").lessThan(Le("price"),"Offer price must be less than the original price").required("Offer price is required")}),onSubmit:r=>{var i,u,h,y,Q,X,Y,Z,ee,re,ie,oe,te,de,ne;const d=new FormData;d.append("name",r.name),d.append("email",r.email),d.append("mobile",r.mobile),d.append("password",r.password??null),d.append("address",r.address),d.append("pincode",r.pincode),d.append("price",r.price),d.append("offerPrice",r.offerPrice),d.append("propertyTypeId",(i=t==null?void 0:t.propertyTypeId)!=null&&i._id?(u=t==null?void 0:t.propertyTypeId)==null?void 0:u._id:(h=r==null?void 0:r.propertyTypeId)==null?void 0:h.id),d.append("countryId",(y=t==null?void 0:t.countryId)!=null&&y._id?(Q=t==null?void 0:t.countryId)==null?void 0:Q._id:(X=r==null?void 0:r.countryId)==null?void 0:X._id),d.append("stateId",(Y=t==null?void 0:t.stateId)!=null&&Y._id?(Z=t==null?void 0:t.stateId)==null?void 0:Z._id:(ee=r==null?void 0:r.stateId)==null?void 0:ee._id),d.append("cityId",(re=t==null?void 0:t.cityId)!=null&&re._id?(ie=t==null?void 0:t.cityId)==null?void 0:ie._id:(oe=r==null?void 0:r.cityId)==null?void 0:oe.id),d.append("foodAndDiningId",(te=t==null?void 0:t.foodAndDiningId)!=null&&te._id?(de=t==null?void 0:t.foodAndDiningId)==null?void 0:de._id:(ne=r==null?void 0:r.foodAndDiningId)==null?void 0:ne._id),x.length&&x.forEach((a,b)=>{d.append("files[]",a)}),r.amenities&&r.amenities.forEach(a=>{d.append("amenitiesId[]",a._id?a._id:a)}),m?s(fe({formData:d,id:t==null?void 0:t._id})).then(a=>{const{requestStatus:b}=a.meta;b==="fulfilled"&&j("/hotel/hotels")}):s(Ie(d)).then(a=>{const{requestStatus:b}=a.meta;b==="fulfilled"&&j("/hotel/hotels")})}});return o.jsxs(o.Fragment,{children:[le&&o.jsx(xe,{}),o.jsxs(n,{container:!0,justifyContent:"space-between",alignItems:"center",children:[o.jsx(We,{color:"secondary",edge:"start",size:"large","aria-label":"back",onClick:()=>j("/hotel/hotels"),children:o.jsx(Ve,{})}),o.jsx(ge,{variant:"h2",gutterBottom:!0,children:m?"Edit Hotel":"Create Hotel"})]}),o.jsxs("form",{onSubmit:e.handleSubmit,children:[o.jsxs(n,{container:!0,spacing:2,mt:2,children:[o.jsx(n,{item:!0,xs:12,sm:6,children:o.jsx(l,{color:"secondary",fullWidth:!0,required:!0,id:"name",name:"name",label:"Hotel Name",value:(B=e.values)==null?void 0:B.name,onChange:e==null?void 0:e.handleChange,error:((w=e.touched)==null?void 0:w.name)&&!!((F=e.errors)!=null&&F.name),helperText:((S=e.touched)==null?void 0:S.name)&&((E=e.errors)==null?void 0:E.name)})}),o.jsx(n,{item:!0,xs:12,sm:6,children:o.jsx(l,{color:"secondary",fullWidth:!0,required:!0,id:"email",name:"email",label:"Email",value:(L=e.values)==null?void 0:L.email,onChange:e.handleChange,error:((z=e.touched)==null?void 0:z.email)&&!!((V=e.errors)!=null&&V.email),helperText:((W=e.touched)==null?void 0:W.email)&&((M=e.errors)==null?void 0:M.email)})}),o.jsx(n,{item:!0,xs:12,sm:6,children:o.jsx(l,{fullWidth:!0,color:"secondary",id:"mobile",name:"mobile",label:"Mobile",required:!0,inputProps:{maxLength:10,inputMode:"numeric",pattern:"[0-9]*"},value:e.values.mobile,onChange:r=>{const d=r.target.value.replace(/\D/g,"").slice(0,10);e.setFieldValue("mobile",d)},error:e.touched.mobile&&!!e.errors.mobile,helperText:e.touched.mobile&&e.errors.mobile})}),o.jsx(n,{item:!0,xs:12,sm:6,children:o.jsx(l,{fullWidth:!0,color:"secondary",id:"password",name:"password",label:"Password",type:"password",value:(v=e.values)==null?void 0:v.password,onChange:e.handleChange,error:((H=e.touched)==null?void 0:H.password)&&!!(($=e.errors)!=null&&$.password),helperText:((K=e.touched)==null?void 0:K.password)&&((N=e.errors)==null?void 0:N.password)})}),o.jsx(n,{item:!0,xs:12,sm:6,children:o.jsx(f,{options:(T==null?void 0:T.countries)||[],label:"Select Country",id:"country-select",name:"countryId",value:e.values.countryId,onChange:r=>{e.setFieldValue("countryId",r||"")},error:e.touched.countryId&&!!e.errors.countryId,helperText:e.touched.countryId&&e.errors.countryId,required:!0,optionKey:"_id",optionLabel:"name",color:"secondary"})}),o.jsx(n,{item:!0,xs:12,sm:6,children:o.jsx(f,{options:(C==null?void 0:C.states)||[],label:"Select State",id:"state-select",name:"stateId",value:e.values.stateId,onChange:r=>{e.setFieldValue("stateId",r||"")},error:e.touched.stateId&&!!e.errors.stateId,helperText:e.touched.stateId&&e.errors.stateId,required:!0,optionKey:"_id",optionLabel:"name",color:"secondary"})}),o.jsx(n,{item:!0,xs:12,sm:6,children:o.jsx(f,{options:(_==null?void 0:_.cities)||[],label:"Select City",id:"city-select",name:"cityId",value:e.values.cityId,onChange:r=>{e.setFieldValue("cityId",r||"")},error:e.touched.cityId&&!!e.errors.cityId,helperText:e.touched.cityId&&e.errors.cityId,required:!0,optionKey:"_id",optionLabel:"name",color:"secondary"})}),o.jsx(n,{item:!0,xs:12,sm:6,children:o.jsx(l,{color:"secondary",fullWidth:!0,id:"pincode",name:"pincode",label:"Pincode",type:"number",required:!0,value:(O=e.values)==null?void 0:O.pincode,onChange:e.handleChange,error:e.touched.pincode&&!!e.errors.pincode,helperText:e.touched.pincode&&e.errors.pincode})}),o.jsx(n,{item:!0,xs:12,sm:6,children:o.jsx(l,{color:"secondary",fullWidth:!0,id:"price",name:"price",label:"Price",type:"number",required:!0,value:(R=e.values)==null?void 0:R.price,onChange:e.handleChange,error:e.touched.price&&!!e.errors.price,helperText:e.touched.price&&e.errors.price})}),o.jsx(n,{item:!0,xs:12,sm:6,children:o.jsx(l,{color:"secondary",fullWidth:!0,id:"offerPrice",name:"offerPrice",label:"Offer Price",type:"number",value:(k=e.values)==null?void 0:k.offerPrice,onChange:e.handleChange,error:e.touched.offerPrice&&!!e.errors.offerPrice,helperText:e.touched.offerPrice&&e.errors.offerPrice})}),o.jsx(n,{item:!0,xs:12,sm:6,children:o.jsx(f,{options:(A==null?void 0:A.propertyType)||[],label:"Select Property Type",id:"property-select",name:"propertyTypeId",value:e.values.propertyTypeId,onChange:r=>{e.setFieldValue("propertyTypeId",r||"")},error:e.touched.propertyTypeId&&!!e.errors.propertyTypeId,helperText:e.touched.propertyTypeId&&e.errors.propertyTypeId,optionKey:"_id",optionLabel:"name",color:"secondary"})}),o.jsx(n,{item:!0,xs:12,sm:6,children:o.jsxs(be,{fullWidth:!0,color:"secondary",children:[o.jsx(Me,{id:"amenities-label",children:"Amenities"}),o.jsx(ve,{labelId:"amenities-label",id:"amenities",name:"amenities",multiple:!0,value:e.values.amenities,onChange:r=>e.setFieldValue("amenities",r.target.value),input:o.jsx(je,{label:"Amenities"}),renderValue:r=>{var d;return(d=c==null?void 0:c.data)==null?void 0:d.filter(i=>r.includes(i._id)).map(i=>i.name).join(", ")},children:(D=c==null?void 0:c.data)==null?void 0:D.map(r=>{var d,i;return o.jsxs(He,{value:r._id,children:[o.jsx($e,{color:"secondary",checked:(i=(d=e==null?void 0:e.values)==null?void 0:d.amenities)==null?void 0:i.includes(r._id)}),o.jsx(Ae,{primary:r.name})]},r._id)})})]})}),o.jsx(n,{item:!0,xs:12,sm:6,children:o.jsx(f,{options:(I==null?void 0:I.data)||[],label:"Select Food & Dining",id:"property-select",name:"foodAndDiningId",value:e.values.foodAndDiningId,onChange:r=>{e.setFieldValue("foodAndDiningId",r||"")},error:e.touched.foodAndDiningId&&!!e.errors.foodAndDiningId,helperText:e.touched.foodAndDiningId&&e.errors.foodAndDiningId,optionKey:"_id",optionLabel:"name",color:"secondary"})}),o.jsx(n,{item:!0,xs:12,children:o.jsx(l,{color:"secondary",fullWidth:!0,id:"address",name:"address",label:"Address",multiline:!0,minRows:3,value:(G=e.values)==null?void 0:G.address,onChange:e.handleChange,error:((U=e.touched)==null?void 0:U.address)&&!!((J=e.errors)!=null&&J.address),helperText:e.touched.address&&e.errors.address})}),o.jsx(n,{item:!0,xs:12,children:o.jsx(ze,{files:x,setFiles:pe,deleteFile:me})})]}),o.jsx(Te,{sx:{display:"flex",justifyContent:"flex-end",marginTop:2},children:o.jsx(Ke,{type:"submit",variant:"outlined",color:"secondary",size:"medium",children:"Submit"})})]})]})};export{dr as default};