import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import axios from "axios";
//import generateCoverImage from "./api/generateCover"
export default function Home() {
  const [inspirationTextInput, setInspirationTextInput] = useState("");
  const [result, setResult] = useState();

  function savePoem(inspirationText, poem) {
    const filenamee = `${inspirationText}.txt`;
    const filename = filenamee.trim();
    const element = document.createElement("a");
    const file = new Blob([poem], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    console.log(`Poem downloaded as ${filename}`);
  }
  /*async function generateCoverImage(inspirationText) {
try {
const response = await axios.post("https://api.openai.com/v1/images/generations", {
model: "image-alpha-001",
prompt: Generate a cover image for a love poem with the inspiration text: "${inspirationText}",
}, {
headers: {
"Authorization": Bearer ${process.env.OPENAI_API_KEY},
"Content-Type": "application/json",
},
});
return response.data.data[0].url;
} catch (error) {
console.error(error);
return null;
}
}*/
  
  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            inspirationText: inspirationTextInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      savePoem(inspirationTextInput, data.result);
     /* const coverImageUrl = await generateCoverImage(inspirationTextInput);
      if (coverImageUrl) {
        document.getElementById("cover-image").src = coverImageUrl;
      }*/
      setInspirationTextInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

// <img id="cover-image" />

  return (
    <div>
      <Head>
        <title>Your Love Poem</title>
        <link rel="icon" href="/poem.png" />
      </Head>
      
      <main className={styles.main}>
        <img src="/poem.png" className={styles.icon} />
        <h3>Love Poetry</h3>
        <div><h4><strong>Inserisci 3 parole d'ispirazione al tuo poeta Artificiale.</strong></h4><h4>Yapay şairinize ilham veren 3 kelime ekleyin.</h4></div>
        
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="inspirationtext"
            placeholder="Inspire me"
            value={inspirationTextInput}
            onChange={(e) => setInspirationTextInput(e.target.value)}
          />
          <input type="submit" value="Generate Love Poem" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
