"use client"

import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useEffect, useState } from "react";
import { Service } from "../service/service";
import FileInput from "@/components/form/input/FileInput";
import { TransitionProps } from "react-transition-group/Transition";
import Alert, { AlertColor } from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { IApiKey } from "@/utils/models/apikey.interface";
import Select from "@/components/form/Select";
import { ChevronDownIcon, CloseLineIcon } from "@/icons";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";


export default function Licitations() {
    const service: Service = new Service();
    const [isLoadingReport, setIsLoadingReport] = useState<boolean>(false);
    const [fileSelected, setFileSelected] = useState<any>();
    const [storedPrompts, setStoredPrompts] = useState<any[] | null>(null);
      const [selectedPrompt, setSelectedPrompt] = useState<string>('');
      const [storedApiKey, setStoredApiKey] = useState<IApiKey[] | null>(null);
      const [openSnackBar, setOpenSnackBar] = useState<{
          open: boolean;
          Transition: React.ComponentType<
            TransitionProps & {
              children: React.ReactElement<any, any>;
            }
          >;
          severity: AlertColor;
        }>({
          open: false,
          Transition: Slide,
          severity: 'info'
        });
        const [snackbarMessage, setSnackbarMessage] = useState<string>('');

    const generateFullReport = async () => {
        setIsLoadingReport(true);
        if (storedApiKey) {
            try {
                const fileBase64 = await service.fileToBase64(fileSelected);
                const cleanBase64 = fileBase64.split(",")[1];
                const response = await service.getFullReport(cleanBase64, selectedPrompt, storedApiKey[0].value);
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
                setSnackbarMessage(`Erro! ${err.message}`)
                setOpenSnackBar({...openSnackBar, open: true, severity: 'error'});
                setIsLoadingReport(false);
                throw new Error(err)
            } finally {
                setIsLoadingReport(false);
            }
        }
    }
    
    const oepnLink = () => {
        window.open('https://aistudio.google.com/apikey', '_blank');
        window.open('https://developers.google.com/workspace/guides/create-project?hl=pt-br', '_blank');
    }

    const getPrompts = async () => {
        try {
            const response = await service.getPropmts();
            const formatedOptions = response.map((e: any) => {
            return {
                value: e.value,
                label: e.nickname
            }
            });
            setStoredPrompts(formatedOptions);
        } catch (err: any) {
            throw Error(err);
        }
    }

    const getApiKeys = async () => {
        try {
            const response = await service.getApiKey();
            setStoredApiKey(response);
        } catch (err: any) {
            throw Error(err);
        }
    }

    useEffect(() => {
        if (!storedPrompts) getPrompts();
        if (!storedApiKey) getApiKeys();
    }, []);

    const handleCloseSnackbar = () => {
        setOpenSnackBar({
        ...openSnackBar,
        open: false,
        });
    };

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
                                            A análise identificará neste edital informações mais completas como número do processo, órgão que irá comprar, 
                                            dia da sessão, endereço eletrônico, documentos necessários, itens pertnentes, necessidade de habilitação técnica.
                                            </p>
                                        </div>
                                        <form className="flex flex-col">
                                            <div className="px-2 overflow-y-auto custom-scrollbar">
                                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
                                                    <div className="col-span-4">
                                                        <Label>Prompt</Label>
                                                        <div className="relative">
                                                        <Select
                                                        options={storedPrompts ? storedPrompts : []}
                                                        placeholder="Selecione o prompt adequado para esta operação"
                                                        onChange={setSelectedPrompt}
                                                        className="dark:bg-dark-900"
                                                        />
                                                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                                                            <ChevronDownIcon />
                                                        </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <Label>Edital</Label>
                                                    <FileInput onChange={(event) => event.target.files ? setFileSelected(event.target.files[0]) : null} />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                                                <Button disabled={isLoadingReport || !selectedPrompt || !storedApiKey || !fileSelected} size="sm" onClick={() => generateFullReport()}>
                                                    {!storedApiKey ? 'Ocorreu um erro ao busar sua Apikey' : isLoadingReport ? 'Analisando dados...' : 'Gerar análise'}
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Snackbar
                        open={openSnackBar.open}
                        autoHideDuration={6000}
                        slots={{ transition: openSnackBar.Transition}}
                        action={
                            <IconButton aria-label="edit-button" color="inherit" onClick={() => setOpenSnackBar({...openSnackBar, open: false})}>
                            <CloseLineIcon />
                            </IconButton>
                        }>
                            <Alert
                            onClose={handleCloseSnackbar}
                            severity={openSnackBar.severity}
                            variant="filled">
                            {snackbarMessage}
                            </Alert>
                        </Snackbar>
                    </ComponentCard>
                </div>
            </div>
            
        </div>
    );
}