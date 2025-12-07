import axios from 'axios';
import { GoogleGenAI } from "@google/genai";
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseconfig';

export class Service {
    async getFilterOptions() {
        try {
            const response = await axios.get(
                'https://conteudo.api.portaldecompraspublicas.com.br/v2/pesquisa/parametros-pesquisa'
            );
            return response.data;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async getLicitations(params: Record<string, string | number>) {
        try {
            const response = await axios.get(
                'https://compras.api.portaldecompraspublicas.com.br/v2/licitacao/processos',
                { params }
            );
            return response.data;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async getItemsByCodigoLicitacao(codigoLicitacao: any) {
        const firstResponse = await fetch(
            `https://compras.api.portaldecompraspublicas.com.br/v2/licitacao/${codigoLicitacao}/itens?filtro=&pagina=1`
        );
        const firstData = await firstResponse.json();
        const pageCount = firstData.itens?.pageCount ?? 0;
        if (!firstData.itens?.result) {
            return [];
        }

        const items = [...firstData.itens.result];

        if (pageCount > 1) {
            const requests = [];
            for (let page = 2; page <= pageCount; page++) {
                requests.push(
                    fetch(
                        `https://compras.api.portaldecompraspublicas.com.br/v2/licitacao/${codigoLicitacao}/itens?filtro=&pagina=${page}`
                    ).then((res) => res.json())
                );
            }

            const responses = await Promise.all(requests);

            responses.forEach((data) => {
                if (data.itens?.result) {
                    items.push(...data.itens.result);
                }
            });
        }

        return items;
    }

    async getLicitationEdital(codigoLicitacao: number) {
        try {
            const response = await axios.get<any>(
            `https://compras.api.portaldecompraspublicas.com.br/v2/licitacao/${codigoLicitacao}/documentos/processo`
            );

            const data = await response.data;
            const edital = data?.find(
            (doc: any) =>
                doc.tipo === "Edital" &&
                doc.nome.toLowerCase().includes("edital") &&
                doc.url
            );

            return edital ? edital.url : null;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async getReports(json: string, prompt: string, apiKey: string) {
        const ai = new GoogleGenAI({ apiKey: apiKey });
        const contents = [{
            role: 'user',
            parts: [
                {
                    text: prompt
                },
                {
                    text: json
                }
            ]
        }
        ]
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: contents
        });
        return response;
    }

    async getFullReport(file: string, prompt: string, apiKey: string) {
        const ai = new GoogleGenAI({ apiKey: apiKey });
        const contents = [{
            role: 'user',
            parts: [
                { text: prompt },
                {
                    inlineData: {
                        data: file,
                        mimeType: 'application/pdf'
                    }
                }
            ]
        }];

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents
        });
        return response;
    }

    async storeReports(data: any) {
        const response = await fetch(
            `https://68dbf10f445fdb39dc2727ee.mockapi.io/api/v1/ai-reports/generated-reports`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );
        return response.json();
    }

    fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {

            const base64String = reader.result as string;
            resolve(base64String);
            };

            reader.onerror = (error) => reject(error);

            reader.readAsDataURL(file);
        });
    };

    async teste(): Promise<any> {
        try {
            const querySnapshot = await getDocs(collection(db, "teste"));
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return items;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async getApiKey(): Promise<any> {
        try {
            const querySnapshot = await getDocs(collection(db, "gemini_api_keys"));
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return items;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async updateApiKey(id: string, newData: any) {
        try {
            const docRef = doc(db, "gemini_api_keys", id);
            const response = await updateDoc(docRef, newData);
            return response;
        } catch (err) {
            console.error("Erro ao atualizar o documento:", err);
        }
    }

    async getPropmts(): Promise<any> {
        try {
            const querySnapshot = await getDocs(collection(db, "prompts"));
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return items;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async updatePropmts(id: string, newData: any): Promise<any> {
        try {
            const docRef = doc(db, "prompts", id);
            const response = await updateDoc(docRef, newData);
            return response;
        } catch (err: any) {
            throw new Error(err);
        }
    }
}

