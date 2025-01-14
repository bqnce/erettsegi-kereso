import axios from 'axios'

export default async function checkLink(url: string): Promise<boolean> {
    try{
        const response = await axios.head(url);
        if(response.status >= 200 && response.status < 300){
            console.log(`A link elérhető: ${url}`);
            return true;
        } else {
            console.log(`A link nem elérhető, státusz: ${response.status}`);
            return false;
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log(`A link nem elérhető. Státusz: ${error.response.status}`);
        } else if (axios.isAxiosError(error) && error.request) {
          console.log('A kérés nem érkezett válaszként.');
        } else {
          console.log('Hiba történt:');
        }
        return false; // Hálózati hiba, URL elérhetetlen
      }
}