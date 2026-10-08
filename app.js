const PRODUCTS=[
["Sesame Seeds","oilseeds","🌱","Quality-focused Nigerian sesame sourcing for B2B buyers."],
["Soybeans","oilseeds","🫘","Nigerian soybeans for food, feed and industrial applications."],
["Raw Cashew Nuts","nuts","🥜","Raw cashew sourcing subject to current season and availability."],
["Cocoa Beans","other","🍫","Cocoa bean sourcing from Nigerian supply networks."],
["Pigeon Pea","other","🫘","Pigeon pea sourcing for domestic and international demand."],
["Peanut","nuts","🥜","Nigerian peanut sourcing for qualified B2B enquiries."],
["Hibiscus Flower","other","🌺","Dried hibiscus sourcing for food and beverage applications."],
["Tiger Nuts","nuts","🌰","Tiger nut sourcing with quantity and specification discussions."],
["Maize","grains","🌽","Maize sourcing for commercial and industrial buyers."],
["Sorghum","grains","🌾","Sorghum sourcing for food, feed and industrial uses."],
["Millet","grains","🌾","Millet sourcing from Nigerian agricultural supply networks."],
["Chilli Pepper","spices","🌶️","Chilli pepper sourcing for food and spice buyers."]
];
const products=document.getElementById("products"),search=document.getElementById("search"),filter=document.getElementById("filter"),empty=document.getElementById("empty"),commodity=document.getElementById("commodity");
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
PRODUCTS.forEach(p=>{const o=document.createElement("option");o.value=p[0];o.textContent=p[0];commodity.appendChild(o);});
function render(){const q=search.value.toLowerCase(),f=filter.value;const list=PRODUCTS.filter(p=>(f==="all"||p[1]===f)&&(!q||(p[0]+" "+p[3]).toLowerCase().includes(q)));products.innerHTML=list.map(p=>`<article class="product"><div class="pic">${p[2]}</div><div><small>${esc(p[1])}</small><h3>${esc(p[0])}</h3><p>${esc(p[3])}</p><a href="#rfq" data-product="${esc(p[0])}">Enquire about ${esc(p[0])} →</a></div></article>`).join("");empty.classList.toggle("hide",list.length>0);}
render();search.addEventListener("input",render);filter.addEventListener("change",render);
products.addEventListener("click",e=>{const a=e.target.closest("[data-product]");if(a)commodity.value=a.dataset.product;});
const menu=document.getElementById("menuBtn"),nav=document.getElementById("nav");menu.addEventListener("click",()=>nav.classList.toggle("open"));nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
const modal=document.getElementById("modal"),title=document.getElementById("modalTitle"),text=document.getElementById("modalText");
const info={incoterms:["Incoterms","Incoterms clarify responsibilities, costs and risks between buyer and seller. Common terms include EXW, FOB, CFR and CIF."],payment:["Payment Terms","Payment arrangements should be agreed before a transaction is confirmed. Options can include advance payment, documentary collection or letters of credit, depending on the transaction."],documents:["Export Documents","Agricultural exports can require commercial invoices, packing lists, certificates of origin and phytosanitary documentation. Requirements depend on the commodity and destination."],quality:["Quality & Specifications","A good enquiry should state product type, quality parameters, packaging, quantity, origin, inspection requirements and destination."]};
document.querySelectorAll("[data-modal]").forEach(b=>b.addEventListener("click",()=>{title.textContent=info[b.dataset.modal][0];text.textContent=info[b.dataset.modal][1];modal.classList.remove("hide");}));
document.getElementById("close").onclick=()=>modal.classList.add("hide");modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.add("hide")});
document.getElementById("rfq").addEventListener("submit",e=>{e.preventDefault();const d=new FormData(e.currentTarget);const subject=`RFQ / Commodity Enquiry - ${d.get("commodity")||"Agricultural Commodity"}`;const body=[`Name: ${d.get("name")}`,`Company: ${d.get("company")||"Not provided"}`,`Email: ${d.get("email")}`,`Commodity: ${d.get("commodity")}`,`Quantity / Requirement: ${d.get("quantity")||"Not provided"}`,`Destination: ${d.get("destination")||"Not provided"}`,"",`Message: ${d.get("message")||"Not provided"}`].join("\n");location.href=`mailto:agrocomconltd@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;});