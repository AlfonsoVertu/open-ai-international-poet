import { Configuration, OpenAIApi } from "openai";

const fs = require("fs");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const inspirationText = req.body.inspirationText || '';
  if (inspirationText.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid Ispiration Text",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(inspirationText),
      temperature: 0.7,
      max_tokens: 1120,
      n:1,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
    
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}


function generatePrompt(inspirationText) {
  const capitalizedinspirationText =
    inspirationText[0].toUpperCase() + inspirationText.slice(1).toLowerCase();
    
  return `Scrivi un poema d amore per una ragazza in lingua turca, veramente suggestiva. inoltre traduci in lingua italiana il testo Generato.

inspirationText: Cuore anima forza  
Poem: Talvolta con il cuore, 
      Raramente con l’anima, 
      Ancora con la forza, 
      Pochi – amano davvero,
      Ma la loro forza sostiene il mondo
Translate: Bazen kalple,
       Nadiren ruhla,
       Yine kuvvetle,
       Birkaç - gerçekten seviyorlar,
       Ama güçleri dünyayı ayakta tutuyor

inspirationText: Il più bello dei mari 
Poem: Il più bello dei mari
      è quello che non navigammo.
      Il più bello dei nostri figli
      non è ancora cresciuto.
      I più belli dei nostri giorni
      non li abbiamo ancora vissuti.
      E quello che vorrei dirti di più bello
      non te l’ho ancora detto.
 Translate: Denizlerin en güzeli
       yelken açmadığımız şey buydu.
       Çocuklarımızın en güzeli
       henüz büyümedi.
       günlerimizin en güzeli
       henüz onları deneyimlemedik.
       Ve sana en güzel söylemek istediğim şey
       Sana henüz söylemedim.
      
InspirationText: occhichi sogni braccia anima
Poem: chiudi gli occhi
      piano piano
      e come s’affonda nell’acqua
      immergiti nel sonno
      nuda e vestita di bianco
      il più bello dei sogni
      ti accoglierà
      anima mia
      chiudi gli occhi
      piano piano
      abbandonati come nell’arco delle mie braccia
      nel tuo sonno non dimenticarmi
      chiudi gli occhi pian piano
      i tuoi occhi marroni
      dove brucia una fiamma verde
      anima mia.
Translate: gözlerini kapat
       çok sessiz
       ve suya nasıl batar
       kendini uykuya daldır
       çıplak ve beyaz giyinmiş
       rüyaların en güzeli
       seni ağırlayacak
       ruhum
       gözlerini kapat
       çok sessiz
       kollarımda olduğu gibi terk edilmiş
       uykunda beni unutma
       gözlerini yavaşça kapat
       kahverengi gözlerin
       yeşil bir alevin yandığı yerde
       ruhum.

InspirationText: impedimenti tempesta giudizio
Poem: Non sia mai ch’io ponga impedimenti
      all’unione di anime fedeli; Amore non è Amore
      se muta quando scopre un mutamento
      o tende a svanire quando l’altro s’allontana.
      Oh no! Amore è un faro sempre fisso
      che sovrasta la tempesta e non vacilla mai;
      è la stella-guida di ogni sperduta barca,
      il cui valore è sconosciuto, benché nota la distanza.
      Amore non è soggetto al Tempo, pur se rosee labbra e gote
      dovran cadere sotto la sua curva lama;
      Amore non muta in poche ore o settimane,
      ma impavido resiste al giorno estremo del giudizio:
      se questo è errore e mi sarà provato,
      io non ho mai scritto, e nessuno ha mai amato.
Translate: Yoluma engeller koymama asla izin verme
           sadık ruhların birliğine; Aşk aşk değildir
           bir değişiklik keşfettiğinde değişir
           veya diğeri uzaklaştığında yok olma eğilimindedir.
           Oh hayır! Aşk her zaman sabit bir deniz feneridir
           fırtınanın üzerinde duran ve asla sendelemeyen;
           her kayıp teknenin yol gösterici yıldızıdır,
           uzaklığı bilindiği halde değeri bilinmeyen.
           Dudaklar ve yanaklar pembe olsa da Aşk Zamana tabi değildir.
           kıvrık kılıcının altına düşmelidirler;
           Aşk birkaç saatte veya haftada değişmez,
           ama korkusuzca direniyor aşırı yargı gününe:
           eğer bu bir hataysa ve kanıtlanacaksam,
           Hiç yazmadım, kimse de sevmedi.

InspirationText: amore gentilezza lacrime
poem: Se devi amarmi, per null’altro sia
      se non che per amore.
      Mai non dire:
      t’amo per il sorriso,
      per lo sguardo,
      la gentilezza del parlare,
      il modo di pensare così conforme al mio,
      che mi rese sereno un giorno.
      Queste son tutte cose
      che possono mutare, amato,
      in sé o per te, un amore
      così sorto potrebbe poi morire.
      E non amarmi per pietà di lacrime
      che bagnino il mio volto.
      Può scordare il pianto chi ebbe a lungo il tuo conforto,
      e perderti.
      Soltanto per amore amami – e per sempre, per l’eternità.
Translate: Eğer beni başka hiçbir şey için sevmen gerekiyorsa
           aşk hariç
           Asla söyleme:
           seni gülüşün için seviyorum
           görünüm için
           konuşma nezaketi,
           düşünme biçimi benimkiyle aynı doğrultuda,
           bu beni bir gün sakinleştirdi.
           Bunların hepsi şeyler
           bu değişebilir sevgilim
           kendi içinde ya da senin için bir aşk
           bu şekilde ortaya çıktıktan sonra ölebilir.
           Ve beni gözyaşlarına acıdığın için sevme
           yüzümü yıkayan
           Unutabilir mi ağlamanı uzun zamandır senin rahatına sahip olan,
           ve seni kaybetmek
           Beni sadece aşkından sev - ve sonsuza kadar, sonsuza kadar.

inspirationText: Ho sognato della mia bella
Poem: Ho sognato della mia bella
      m’è apparsa sopra i rami
      passava sopra la luna
      tra una nuvola e l’altra
      andava e io la seguivi
      mi fermavo e lei si fermava
      la guardavo e lei mi guardava
      e tutto è finito qui
Translate: hayal ettim güzelim
           bana dalların üzerinde göründü
           ayın üzerinden geçti
           bir bulut ile diğeri arasında
           o gitti ben de onu takip ettim
           ben durdum o durdu
           ben ona baktım o da bana
           ve hepsi burada bitti

inspirationText: Rosa Illusione Realtà
Poem: L amore è una rosa, 
      ogni petalo un illusione,
      ogni spina una realtà.
Translate: aşk bir gül,
           her taç yaprağı bir yanılsama,
           her diken bir gerçek.

inspirationText: "[${capitalizedinspirationText}]"
Poem: Insert here a very intensive turkish love poem
Translate: Traduci qui il Poema veramente intenso in ligua Turca.`;
}
