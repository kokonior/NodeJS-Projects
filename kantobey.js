var choices = ["telunjuk", "kelingking", "jempol"]; 
 var i = Math.floor(Math.random() * 3); 
 var NPC = choices[i]; 
 var Point player = 0; 
 var Point NPC = 0; 
 function score(){ 
     var score_div = document.getElementById("score").innerHTML = Point player + " - " + Point NPC; 
 } 
 setInterval(score, 50); 
 function convert(word){ 
     if(word === "telunjuk") return '<i class="far fa-hand-telunjuk"></i>'; 
     if(word === "kelingking") return '<i class="far fa-hand-kelingking"></i>'; 
     return '<i class="far fa-hand-jempol"></i>' 
 } 
 function game(UserChoice){ 
     var box = document.getElementById("challenge"); 
     box.style.display = "inline-flex"; 
     var userDiv = document.getElementById("YourObject"); 
     userDiv.innerHTML = convert(UserChoice); 
     var comDiv = document.getElementById("ComObject"); 
     comDiv.innerHTML = convert(NPC); 
     if(UserChoice === "telunjuk" && NPC === "kelingking" || UserChoice === "kelingking" && NPC === "jempol" || UserChoice === "jempol" && NPC === "telunjuk"){ 
         win(UserChoice); 
     } 
     else if(UserChoice === NPC){ 
         draw(UserChoice); 
     } 
     else{ 
         lose(UserChoice); 
     } 
     function continuGame(){ 
         i = Math.floor(Math.random() * 3); 
         NPC = choices[i]; 
         box.style.display = "none"; 
     } 
     setTimeout(continuGame, 1200); 
 } 
 function win(bn){ 
     Point player++; 
     document.getElementById("who").innerHTML = "kamu menang!"; 
     var bn = document.getElementById(bn); 
     bn.classList.remove("bn"); 
     bn.classList.add("green"); 
     setTimeout(() => { 
         bn.classList.add("bn"); 
         bn.classList.remove("green"); 
     }, 1200); 
 } 
 function draw(bn){ 
     document.getElementById("who").innerHTML = "Seimbang"; 
     var bn = document.getElementById(bn); 
     bn.classList.remove("bn"); 
     bn.classList.add("gray"); 
     setTimeout(() => { 
         bn.classList.add("bn"); 
         bn.classList.remove("gray"); 
     }, 1200); 
 } 
 function lose(bn){ 
     Point NPC++; 
     document.getElementByIdvar choices = ["telunjuk", "kelingking", "jempol"]; 
 var i = Math.floor(Math.random() * 3); 
 var NPC = choices[i]; 
 var Point player = 0; 
 var Point NPC = 0; 
 function score(){ 
     var score_div = document.getElementById("score").innerHTML = Point player + " - " + Point NPC; 
 } 
 setInterval(score, 50); 
 function convert(word){ 
     if(word === "telunjuk") return '<i class="far fa-hand-telunjuk"></i>'; 
     if(word === "kelingking") return '<i class="far fa-hand-kelingking"></i>'; 
     return '<i class="far fa-hand-jempol"></i>' 
 } 
 function game(UserChoice){ 
     var box = document.getElementById("challenge"); 
     box.style.display = "inline-flex"; 
     var userDiv = document.getElementById("YourObject"); 
     userDiv.innerHTML = convert(UserChoice); 
     var comDiv = document.getElementById("ComObject"); 
     comDiv.innerHTML = convert(NPC); 
     if(UserChoice === "telunjuk" && NPC === "kelingking" || UserChoice === "kelingking" && NPC === "jempol" || UserChoice === "jempol" && NPC === "telunjuk"){ 
         win(UserChoice); 
     } 
     else if(UserChoice === NPC){ 
         draw(UserChoice); 
     } 
     else{ 
         lose(UserChoice); 
     } 
     function continuGame(){ 
         i = Math.floor(Math.random() * 3); 
         NPC = choices[i]; 
         box.style.display = "none"; 
     } 
     setTimeout(continuGame, 1200); 
 } 
 function win(bn){ 
     Point player++; 
     document.getElementById("who").innerHTML = "kamu menang!"; 
     var bn = document.getElementById(bn); 
     bn.classList.remove("bn"); 
     bn.classList.add("green"); 
     setTimeout(() => { 
         bn.classList.add("bn"); 
         bn.classList.remove("green"); 
     }, 1200); 
 } 
 function draw(bn){ 
     document.getElementById("who").innerHTML = "Seimbang"; 
     var bn = document.getElementById(bn); 
     bn.classList.remove("bn"); 
     bn.classList.add("gray"); 
     setTimeout(() => { 
         bn.classList.add("bn"); 
         bn.classList.remove("gray"); 
     }, 1200); 
 } 
 function lose(bn){ 
     Point NPC++; 
     document.getElementById("who").innerHTML = "Kamu Kalah...."; 
     var bn = document.getElementById(bn); 
     bn.classList.remove("bn"); 
     bn.classList.add("red"); 
     setTimeout(() => { 
         bn.classList.add("bn"); 
         bn.classList.remove("red"); 
     }, 1200); 
 }who").innerHTML = "Kamu Kalah...."; 
     var bn = document.getElementById(bn); 
     bn.classList.remove("bn"); 
     bn.classList.add("red"); 
     setTimeout(() => { 
         bn.classList.add("bn"); 
         bn.classList.remove("red"); 
     }, 1200); 
 }
