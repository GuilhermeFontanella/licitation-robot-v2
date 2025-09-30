"use client"

import ComponentCard from "@/components/common/ComponentCard";
import BasicTableOne from "@/components/tables/BasicTableOne";
import Pagination from "@/components/tables/Pagination";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import { PlugInIcon, MoreDotIcon, DownloadIcon, CheckLineIcon, CloseLineIcon } from "@/icons";
import { useState } from "react";

const data = [
    {
        items: [
            { 
                codigo: 123, 
                descricao: 'descricaodescricao descricaodescricaodescricaodescricaodescricaodescricaodesc ricaodescricaodricaodescricaodescricaodescricaodricaodescricaodescricaodescric aodricaodescricaodescricaodescricaodricaodescricaode scricaodescricaodrica odescricaodescricaodescricaod', 
                quantidade: 1, 
                valorReferencia: 20.0, 
                situacao: { 
                    codigo: 24, 
                    descricao: 'Oportunidade'
                }
            }
        ]
    }
]

export default function Licitations() {

    return (
        <div>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-12">
                    <ComponentCard title="Meus relatórios">
                        <div className="col-span-12">
                            
                            <div style={{ marginTop: '16px' }}>
                                    <div className="space-y-6">
                                        {data.map((element: any, index: number) => (
                                            <ComponentCard 
                                            title={`Processo Nº 1234`} 
                                            desc={(
                                                <div className="mt-2 flex flex-row gap-2">
                                                <div className="flex gap-2" style={{alignItems: 'center'}}>
                                                <Badge
                                                    endIcon={<CheckLineIcon />}
                                                    size='sm'
                                                    color={ 'success' }
                                                    >
                                                  Análise preliminar
                                                </Badge>
                                                </div>
                                                    <div className="flex gap-2" style={{alignItems: 'center'}}>
                                                        <Badge
                                                            endIcon={<CloseLineIcon />}
                                                            size="sm"
                                                            color={ 'error' }
                                                            >
                                                            Análise completa
                                                        </Badge>
                                                    </div>
                                                </div>
                                            )}
                                            key={index} 
                                            headerButton={(
                                            <div className="flex items-center gap-5">
                                                <Button  size="sm" variant="outline" startIcon={<DownloadIcon />} onClick={() => {}}>
                                                    Baixar análise preliminar
                                                </Button>
                                                <Button  size="sm" variant="outline" startIcon={<PlugInIcon />} onClick={() => {}}>
                                                    Gerar análise completa
                                                </Button>
                                            </div>
                                            )}>
                                                <div className="flex flex-row items-center w-full gap-6 xl:flex-row" style={{justifyContent: 'space-between'}}>
                                                    <div>
                                                    <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                                                        {`Lorem Ipsum - SC`}
                                                    </h4>
                                                    <div>
                                                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                                        Descrição
                                                        </p>
                                                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                                        {'Lorem Ipsum Lorem Ipsum Lorem Ipsum'}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left" style={{ marginTop: '16px' }}>
                                                        <div>
                                                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                                            Data de Publicação
                                                        </p>
                                                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                                            {'01/01/2000'}
                                                        </p>
                                                        </div>
                                                        <div>
                                                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                                            Abertura das Propostas
                                                        </p>
                                                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                                            {'01/01/2000'}
                                                        </p>
                                                        </div>
                                                        <div>
                                                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                                            Tipo
                                                        </p>
                                                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                                            {'Lorem Ipsum Lorem Ipsum Lorem Ipsum'}
                                                        </p>
                                                        </div>

                                                    </div>
                                                    </div>

                                                </div>
                                                <div className="flex flex-col col-span-12">
                                                    <h5 className="mb-2 text-lg text-center text-gray-800 dark:text-white/90 xl:text-left">
                                                        Itens marcados como oportunidades
                                                    </h5>
                                                    <BasicTableOne items={data[0].items} key={index} />
                                                </div>
                                            </ComponentCard>
                                        ))}
                                    <div className="col-span-12 w-full" style={{justifyItems: 'center', margin: '32px 0 24px 0'}}>
                                        <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
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