// "use client"

// import ComponentCard from "@/components/common/ComponentCard";
// import BasicTableOne from "@/components/tables/BasicTableOne";
// import Pagination from "@/components/tables/Pagination";
// import Badge from "@/components/ui/badge/Badge";
// import Button from "@/components/ui/button/Button";
// import { PlugInIcon, MoreDotIcon, DownloadIcon, CheckLineIcon, CloseLineIcon } from "@/icons";
// import { useState } from "react";

// const data = [
//     {
//         items: [
//             { 
//                 codigo: 123, 
//                 descricao: 'descricaodescricao descricaodescricaodescricaodescricaodescricaodescricaodesc ricaodescricaodricaodescricaodescricaodescricaodricaodescricaodescricaodescric aodricaodescricaodescricaodescricaodricaodescricaode scricaodescricaodrica odescricaodescricaodescricaod', 
//                 quantidade: 1, 
//                 valorReferencia: 20.0, 
//                 situacao: { 
//                     codigo: 24, 
//                     descricao: 'Oportunidade'
//                 }
//             }
//         ]
//     }
// ]

// export default function Licitations() {

//     return (
//         <div>
//             <div className="grid grid-cols-12 gap-4 md:gap-6">
//                 <div className="col-span-12 space-y-6 xl:col-span-12">
//                     <ComponentCard title="Meus relatórios">
//                         <div className="col-span-12">
                            
//                             <div style={{ marginTop: '16px' }}>
//                                     <div className="space-y-6">
//                                         {data.map((element: any, index: number) => (
//                                             <ComponentCard 
//                                             title={`Processo Nº 1234`} 
//                                             desc={(
//                                                 <div className="mt-2 flex flex-row gap-2">
//                                                 <div className="flex gap-2" style={{alignItems: 'center'}}>
//                                                 <Badge
//                                                     endIcon={<CheckLineIcon />}
//                                                     size='sm'
//                                                     color={ 'success' }
//                                                     >
//                                                   Análise preliminar
//                                                 </Badge>
//                                                 </div>
//                                                     <div className="flex gap-2" style={{alignItems: 'center'}}>
//                                                         <Badge
//                                                             endIcon={<CloseLineIcon />}
//                                                             size="sm"
//                                                             color={ 'error' }
//                                                             >
//                                                             Análise completa
//                                                         </Badge>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             key={index} 
//                                             headerButton={(
//                                             <div className="flex items-center gap-5">
//                                                 <Button  size="sm" variant="outline" startIcon={<DownloadIcon />} onClick={() => {}}>
//                                                     Baixar análise preliminar
//                                                 </Button>
//                                                 <Button  size="sm" variant="outline" startIcon={<PlugInIcon />} onClick={() => {}}>
//                                                     Gerar análise completa
//                                                 </Button>
//                                             </div>
//                                             )}>
//                                                 <div className="flex flex-row items-center w-full gap-6 xl:flex-row" style={{justifyContent: 'space-between'}}>
//                                                     <div>
//                                                     <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
//                                                         {`Lorem Ipsum - SC`}
//                                                     </h4>
//                                                     <div>
//                                                         <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
//                                                         Descrição
//                                                         </p>
//                                                         <p className="text-sm font-medium text-gray-800 dark:text-white/90">
//                                                         {'Lorem Ipsum Lorem Ipsum Lorem Ipsum'}
//                                                         </p>
//                                                     </div>
//                                                     <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left" style={{ marginTop: '16px' }}>
//                                                         <div>
//                                                         <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
//                                                             Data de Publicação
//                                                         </p>
//                                                         <p className="text-sm font-medium text-gray-800 dark:text-white/90">
//                                                             {'01/01/2000'}
//                                                         </p>
//                                                         </div>
//                                                         <div>
//                                                         <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
//                                                             Abertura das Propostas
//                                                         </p>
//                                                         <p className="text-sm font-medium text-gray-800 dark:text-white/90">
//                                                             {'01/01/2000'}
//                                                         </p>
//                                                         </div>
//                                                         <div>
//                                                         <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
//                                                             Tipo
//                                                         </p>
//                                                         <p className="text-sm font-medium text-gray-800 dark:text-white/90">
//                                                             {'Lorem Ipsum Lorem Ipsum Lorem Ipsum'}
//                                                         </p>
//                                                         </div>

//                                                     </div>
//                                                     </div>

//                                                 </div>
//                                                 <div className="flex flex-col col-span-12">
//                                                     <h5 className="mb-2 text-lg text-center text-gray-800 dark:text-white/90 xl:text-left">
//                                                         Itens marcados como oportunidades
//                                                     </h5>
//                                                     <BasicTableOne items={data[0].items} key={index} />
//                                                 </div>
//                                             </ComponentCard>
//                                         ))}
//                                     <div className="col-span-12 w-full" style={{justifyItems: 'center', margin: '32px 0 24px 0'}}>
//                                         <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </ComponentCard>
//                 </div>
//             </div>
            
//         </div>
//     );
// }


// PROVISORIO
"use client"

import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useState } from "react";
import { Service } from "../service/service";
import { PROMPT1 } from "@/utils/constants/prompt";
import FileInput from "@/components/form/input/FileInput";


export default function Licitations() {
    const service: Service = new Service();
    const [apiKey, setApiKey] = useState<string>('');
    const [isLoadingReport, setIsLoadingReport] = useState<boolean>(false);
    const [fileSelected, setFileSelected] = useState<any>();

    const generateFullReport = async () => {
        setIsLoadingReport(true);
        const fileBase64 = service.fileToBase64(fileSelected);
        try {
            const response = await service.getFullReport(fileBase64, PROMPT1, apiKey);
            const content = response.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

            if (!content) {
                throw new Error("Nenhum conteúdo retornado");
            }

            const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "documento.txt";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
          
        } catch (err: any) {
          throw new Error(err)
        } finally {
            setIsLoadingReport(true);
        }
    }
    
    const oepnLink = () => {
        window.open('https://aistudio.google.com/apikey', '_blank');
        window.open('https://developers.google.com/workspace/guides/create-project?hl=pt-br', '_blank');
    }

    return (
        <div>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-12">
                    <ComponentCard title="Análise completa de editais">
                        <div className="col-span-12">
                            <div style={{ marginTop: '16px' }}>
                                <div className="space-y-6">
                                    <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
                                        <div className="px-2 pr-14">
                                            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                                            Gerar análise completa com IA
                                            </h4>
                                            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                                            Esta análise preliminar irá verificar o edital selecionado, conforme o prompt previamente definido. 
                                            O relatório identificará se os editais contém itens que obedecem as regras estabelecidas, 
                                            fornecendo informações mais precisas sobre possíveis oportunidades de negócio.
                                            Para continuar, insira a sua Api Key e o arquivo PDF do edital desejado.
                                            </p>
                                        </div>
                                        <form className="flex flex-col">
                                            <div className="px-2 overflow-y-auto custom-scrollbar">
                                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
                                                    <div>
                                                        <Label>API Key</Label>
                                                        <Input disabled={isLoadingReport} type="text" placeholder="Insira a sua Api Key para gerar o relatório completo" onChange={(value) => setApiKey(value.target.value)} />
                                                        <a className="text-gray-400 hover:text-blue-700" style={{ cursor: 'pointer', fontSize: '12px'}} onClick={oepnLink}>Não tenho minha Api Key</a>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <Label>Edital</Label>
                                                    <FileInput onChange={(event) => event.target.files ? setFileSelected(event.target.files[0]) : null} />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                                            {
                                                <Button disabled={isLoadingReport || !apiKey || !fileSelected} size="sm" onClick={() => generateFullReport()}>
                                                    {isLoadingReport ? 'Analisando dados...' : 'Gerar análise'}
                                                </Button>
                                            }
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ComponentCard>
                </div>
            </div>
            
        </div>
    );
}