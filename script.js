document.getElementById("GenerateBtn").addEventListener("click", async function
 () {
  //let token = "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";
  let token = "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";
  let input = document.getElementById("textInput").value;

  //console.log(input);
  let imageContainer = document.getElementById("imageContainer")
  let downloadBtn = document.getElementById("downloadBtn")
  //console.log(imageContainer);
  

  async function generateImage(data) {
    console.log(data);
    
	const response = await fetch(
		"https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
		{
			headers: {
				Authorization: `Bearer ${token}`,

			},
			method: "POST",
			body: JSON.stringify({ "inputs": input }),
		}
	);
    console.log(response)
   


    if (!response.ok) {
        throw new Error("API error");  
  }
   
   const result = await response.blob();
   return result; 
}

    try {
        let imageBlob = await generateImage(input);
        let imageUrl = URL.createObjectURL(imageBlob);
        imageContainer.innerHTML = `<img src ="${imageUrl}" class="mx-auto rounded-lg shadow-lg "/>`;

        // add the download the btn

        const downloadBtn = document.createElement('button');
        downloadBtn.textContent = "Download Image"
        downloadBtn.classList.add('w-full','bg-blue-500','rounded-lg','px-6','mt-4','py-2')

        downloadBtn.addEventListener("click",function(){
            
            const link = document.createElement('a')
            link.href = imageUrl;
            link.download = 'generated-image.png'
            link.click()

        })
 
        imageContainer.appendChild(downloadBtn);


    } catch (error) {
       // console.error("Error generating image:", error);

        
    }
});

//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

/*async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
		{
			headers: {
				Authorization: "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}
query({"inputs": "Astronaut riding a horse"}).then((response) => {
	// Use image
});*/