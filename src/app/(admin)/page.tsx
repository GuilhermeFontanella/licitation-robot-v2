"use client"
import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React, { useState } from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { ChatIcon, ChevronDownIcon, ChevronUpIcon, CloseIcon, CloseLineIcon, DownloadIcon, FileIcon, MoreDotIcon, PlugInIcon, RobotIcon, TaskIcon } from "@/icons";
import Input from "@/components/form/input/InputField";
import BlankPage from "../../components/BlankPage";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import Link from "next/link";
import Pagination from "@/components/tables/Pagination";
import Badge from "@/components/ui/badge/Badge";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";

const data: any[] | null = null // [
  // {
  //   nProcesso: '011/2024',
  //   orgao: 'Prefeitura Municipal da Estância de Atibaia',
  //   descricao: 'Aquisição de placas de sinalização de segurança do trabalho e de prevenção contra incêndios, como as previstas na NR 23 (Proteção Contra Incêndios) e na NR 26 (Sinalização de Segurança) para o Município de Capinzal e Seus Entes.',
  //   dataPublicacao: '29/08/2025 às 09:31',
  //   aberturaPropostas: '28/08/2026 às 16:00',
  //   tipo: 'Pregão para Registro de Preços - Menor Preço',
  //   url: '',
  //   statusIa: 'com potencial'
  // },
  // {
  //   nProcesso: '011/2024',
  //   orgao: 'Prefeitura Municipal da Estância de Atibaia',
  //   descricao: 'Aquisição de placas de sinalização de segurança do trabalho e de prevenção contra incêndios, como as previstas na NR 23 (Proteção Contra Incêndios) e na NR 26 (Sinalização de Segurança) para o Município de Capinzal e Seus Entes.',
  //   dataPublicacao: '29/08/2025 às 09:31',
  //   aberturaPropostas: '28/08/2026 às 16:00',
  //   tipo: 'Pregão para Registro de Preços - Menor Preço',
  //   url: '',
  //   statusIa: 'sem potencial'
  // },
  // {
  //   nProcesso: '011/2024',
  //   orgao: 'Prefeitura Municipal da Estância de Atibaia',
  //   descricao: 'Aquisição de placas de sinalização de segurança do trabalho e de prevenção contra incêndios, como as previstas na NR 23 (Proteção Contra Incêndios) e na NR 26 (Sinalização de Segurança) para o Município de Capinzal e Seus Entes.',
  //   dataPublicacao: '29/08/2025 às 09:31',
  //   aberturaPropostas: '28/08/2026 às 16:00',
  //   tipo: 'Pregão para Registro de Preços - Menor Preço',
  //   url: '',
  //   statusIa: null
  // },
  // {
  //   nProcesso: '011/2024',
  //   orgao: 'Prefeitura Municipal da Estância de Atibaia',
  //   descricao: 'Aquisição de placas de sinalização de segurança do trabalho e de prevenção contra incêndios, como as previstas na NR 23 (Proteção Contra Incêndios) e na NR 26 (Sinalização de Segurança) para o Município de Capinzal e Seus Entes.',
  //   dataPublicacao: '29/08/2025 às 09:31',
  //   aberturaPropostas: '28/08/2026 às 16:00',
  //   tipo: 'Pregão para Registro de Preços - Menor Preço',
  //   url: '',
  //   statusIa: null
  // },
]


export default function Ecommerce() {
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const { isOpen, closeModal, openModal } = useModal();
  const [results, setResults] = useState<any[]>([1]);
  const [showEditalOptions, setShowEditalOptions] = useState<boolean>(false);

  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  const showFilter = () => {
    setIsOpenFilter(!isOpenFilter);
  }

  const showOptions = () => {
    setShowEditalOptions(!showEditalOptions);
  }

  return (
    <>
    <div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {results.length > 0 && (
          <div style={{position: 'fixed', right: 24}}>
            <div className="flex items-center gap-5">
                <Button size="sm" onClick={openModal}>
                  Ações com IA
                </Button>
            </div>
          </div>
        )}
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <ComponentCard title="Pesquisa de licitações">
            <div className="flex items-center gap-5">
              <Button size="md" variant="primary">
                Busca rápida
              </Button>
              <Button size="md" variant="outline" onClick={showFilter} endIcon={!isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}>
                Busca avançada
              </Button>
            </div>
            {isOpen && (
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                  <Label>Pesquisa por termo</Label>
                  <Input type="text" placeholder="exemplo: Compra" />
                </div>
                <div className="col-span-4">
                  <Label>Status</Label>
                  <div className="relative">
                    <Select
                      options={options}
                      placeholder="Select an option"
                      onChange={handleSelectChange}
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>
                <div className="col-span-4">
                  <Label>Modalidade</Label>
                  <div className="relative">
                    <Select
                      options={options}
                      placeholder="Select an option"
                      onChange={handleSelectChange}
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>
                <div className="col-span-4">
                  <Label>Realização</Label>
                  <div className="relative">
                    <Select
                      options={options}
                      placeholder="Select an option"
                      onChange={handleSelectChange}
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>
                <div className="col-span-4">
                  <Label>Julgamento</Label>
                  <div className="relative">
                    <Select
                      options={options}
                      placeholder="Select an option"
                      onChange={handleSelectChange}
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>
                <div className="col-span-4">
                  <Label>Periodo</Label>
                  <div className="relative">
                    <Select
                      options={options}
                      placeholder="Select an option"
                      onChange={handleSelectChange}
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>
                <div className="col-span-4">
                  <Label>UF</Label>
                  <div className="relative">
                    <Select
                      options={options}
                      placeholder="Select an option"
                      onChange={handleSelectChange}
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>

                <div className="col-span-12 flex flex-row-reverse gap-5" style={{ marginTop: '16px', justifyItems: 'end' }}>
                  <Button size="md" variant="primary">
                    Buscar
                  </Button>
                  <Button disabled size="md" variant="outline" onClick={() => { console.log('limpar campos') }} endIcon={<CloseLineIcon />}>
                    Limpar campos
                  </Button>
                </div>
              </div>
            )}
          </ComponentCard>
        </div>
      </div>
      <div style={{ marginTop: '16px' }}>
        {results.length > 0
          ? (
            <div className="space-y-6">
              {data.map((element: any, index: number) => (
                <ComponentCard 
                title={`Processo Nº ${element.nProcesso}`} 
                desc={(
                  <Badge
                      size="sm"
                      color={
                        element.statusIa === 'com potencial' 
                          ? 'success' 
                          : element.statusIa === 'sem potencial' 
                            ?  "error" 
                            : 'info'
                      }
                    >
                      {element.statusIa ?? 'Não analisado'}
                    </Badge>
                )}
                key={index} 
                headerButton={(
                  <div className="flex items-center gap-5">
                    <Button size="sm" variant="outline" startIcon={<PlugInIcon />}>
                      Gerar análise preliminar
                    </Button>
                  </div>
                )}>
                  <div className="flex flex-row items-center w-full gap-6 xl:flex-row">
                    <div>
                      <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                        {element.orgao}
                      </h4>
                      <div>
                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          Descrição
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          {element.descricao}
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left" style={{ marginTop: '16px' }}>
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Data de Publicação
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {element.dataPublicacao}
                          </p>
                        </div>
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Abertura das Propostas
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {element.aberturaPropostas}
                          </p>
                        </div>
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Tipo
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {element.tipo}
                          </p>
                        </div>

                      </div>
                    </div>
                    <div className="col-span-12 flex gap-5">
                      <Button size="sm" variant="outline" startIcon={<MoreDotIcon />} onClick={showOptions} >
                        {''}
                      </Button>
                      <Dropdown
                        isOpen={showEditalOptions}
                        onClose={showOptions}
                        className="absolute right-12 mt-[49px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
                      >
                      

                        <ul className="flex flex-col gap-1 pt-4 pb-3 ">
                          <li>
                            <DropdownItem
                              onItemClick={showOptions}
                              tag="a"
                              href="/profile"
                              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                            >
                              <div className="flex items-center gap-3">
                                <DownloadIcon />
                                <h3>Baixar edital</h3>
                              </div>
                              
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem
                              onItemClick={showOptions}
                              tag="a"
                              href="/profile"
                              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                            >
                              <div className="flex items-center gap-3">
                                <FileIcon />
                                <h3>Gerar relatório completo</h3>
                              </div>
                            </DropdownItem>
                          </li>
                          
                        </ul>
                      </Dropdown>
                    </div>

                  </div>
                  <BasicTableOne key={index} />
                </ComponentCard>
              ))}
              <div className="col-span-12 w-full" style={{justifyItems: 'center', margin: '32px 0 24px 0'}}>
                <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
              </div>
            </div>
          )
          : (
            <BlankPage title="Sem resultados para exibir" description="Você pode realizar uma busca rápida ou se preferir uma busca avançada. A busca rápida irá trazer os resultados mais atualizados." />
          )
        }
      </div>
    </div>
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Address
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Country</Label>
                  <Input type="text" defaultValue="United States" />
                </div>

                <div>
                  <Label>City/State</Label>
                  <Input type="text" defaultValue="Arizona, United States." />
                </div>

                <div>
                  <Label>Postal Code</Label>
                  <Input type="text" defaultValue="ERT 2489" />
                </div>

                <div>
                  <Label>TAX ID</Label>
                  <Input type="text" defaultValue="AS4568384" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}