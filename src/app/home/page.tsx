"use client"
import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React, { useEffect, useState } from "react";
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
import { Service } from "../service/service";
import { formatDate } from "@/utils/formatDate";
import { PROMPT2 } from "@/utils/constants/prompt";


export default function Ecommerce() {
  const service: Service = new Service();
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const { isOpen, closeModal, openModal } = useModal();
  const [results, setResults] = useState<any[]>([1]);
  const [showEditalOptions, setShowEditalOptions] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('1');
  const [term, setTerm] = useState<string>('Aquisição');
  const [modality, setModality] = useState<string>('1');
  const [realization, setRealization] = useState<string>('1');
  const [judgement, setJudgement] = useState<string>('1');
  const [uf, setUf] = useState<string>('100142');
  const [statusOptions, setStatusOptions] = useState<any[]>([]);
  const [modalityOptions, setModalityOptions] = useState<any[]>([]);
  const [realizationOptions, setRealizationOptions] = useState<any[]>([]);
  const [ufOptions, setUfOptions] = useState<any[]>([]);
  const [judgementOptions, setJudgementOptions] = useState<any[]>([]);
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [apiKey, setApiKey] = useState<string>('');
  const [isLoadingReport, setIsLoadingReport] = useState<boolean>(false);
  const [itemSelectedForPreliminarReport, setItemSelectedForPreliminarReport] = useState<any | null>(null);
  const [reportGeneratedSuccessfully, setReportGeneratedSuccessfully] = useState<{id: string, success: boolean}>({id: '', success: false});

  const isFilterValueSelected = (): boolean => {
    if (term || status || modality || realization || judgement || uf) {
      return false;
    } else {
      return true;
    }
  }

  const handleSelectChange = (value: string, field: string) => {
    if (field === 'term') {
      setTerm(value);
    } else if (field === 'status') {
      setStatus(value);
    } else if (field === 'modality') {
      setModality(value);
    } else if (field === 'realization') {
      setRealization(value);
    } else if (field === 'judgement') {
      setJudgement(value);
    } else if (field === 'uf') {
      setUf(value);
    }
  };

  const setUrlFilter = () => {
    const url = new URLSearchParams(location.search);

    const filters: [string, string | undefined][] = [
      ['objeto', debouncedInputValue],
      ['codigoStatus', status],
      ['codigoModalidade', modality],
      ['codigoRealizacao', realization],
      ['codigoJulgamento', judgement],
      ['codigoUf', uf],
      ['municipio', '0']
    ];

    filters.forEach(([key, value]) => {
      if (value) url.set(key, value);
      else url.delete(key);
    });


    window.history.pushState(null, '', `?${url.toString()}`);
  };

  useEffect(() => {
    setUrlFilter();
  }, [
    debouncedInputValue,
    status,
    modality,
    realization,
    judgement,
    uf
  ])

  const showFilter = () => {
    setIsOpenFilter(!isOpenFilter);
  }

  const showOptions = () => {
    setShowEditalOptions(!showEditalOptions);
  }

  const resetFilters = () => {
    setTerm('');
    setStatus('');
    setModality('');
    setRealization('');
    setJudgement('');
    setUf('');
  }

  const mapToOptions = (arr: any[] = []) =>
    arr.map(e => ({ value: e?.codigo, label: e?.descricao }));

  const getFilterOptions = async () => {
    try {
      const response = await service.getFilterOptions();

      const status = mapToOptions(response?.status);
      const modalidades = mapToOptions(response?.modalidades);
      const realizacoes = mapToOptions(response?.realizacoes);
      const ufs = mapToOptions(response?.ufs);
      const julgamentos = mapToOptions(response?.julgamentos);

      setStatusOptions(status);
      setModalityOptions(modalidades);
      setRealizationOptions(realizacoes);
      setUfOptions(ufs);
      setJudgementOptions(julgamentos);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLicitations = async () => {
    setData([]);
  try {
    const filters: Record<string, string> = {};

    if (status) filters.codigoStatus = status;
    if (term) filters.objeto = term;
    if (modality) filters.codigoModalidade = modality;
    if (realization) filters.codigoRealizacao = realization;
    if (judgement) filters.codigoJulgamento = judgement;
    if (uf) filters.codigoUf = uf;
    filters.municipio = '0';

    const response = await getLicitations(filters);
    const enriched = await Promise.all(
      response.result.map(async (licitation: any) => ({
        ...licitation,
        items: await getLicitationItemsById(licitation.codigoLicitacao),
        url: await getEditalUrl(licitation.codigoLicitacao)
      }))
    )
    setData(enriched);
  } catch (err) {
    console.error(err);
  }
};

  const getLicitations = async (params: any) => {
    try {
      const response = await service.getLicitations(params);
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  const getEditalUrl = async (id: any) => {
    try {
      const response = await service.getLicitationEdital(id);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  const getLicitationItemsById = async (id: any) => {
    try {
      const response = await service.getItemsByCodigoLicitacao(id);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(term);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [term, 1000]);

  useEffect(() => {
    getFilterOptions();
    fetchLicitations();
  }, []);

  const downloadEdital = (element: any) => {
    const link = document.createElement("a");
    link.href = element.url;
    link.download = `${element.codigoLicitacao}-${element.identificacao}.pdf` || "documento.pdf"; // nome sugerido
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showOptions();
  }

  const generatePreReport = async () => {
    setIsLoadingReport(true);
    const jsonData = JSON.stringify(itemSelectedForPreliminarReport);
    console.log(jsonData);
    try {
      const response = await service.getReports(jsonData, PROMPT2, apiKey);
      const content = response.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      console.log(content);

      const payload = {
        content: JSON.stringify(content)
      }
      const responseStoreReport = await service.storeReports(payload);
      
      setReportGeneratedSuccessfully({id: responseStoreReport.id, success: true});
      setIsLoadingReport(false);
      setItemSelectedForPreliminarReport(null);
      return responseStoreReport;
    } catch (err: any) {
      throw new Error(err)
    } finally {
    }
  }

  const oepnLink = () => {
    window.open('https://aistudio.google.com/apikey', '_blank');
    window.open('https://developers.google.com/workspace/guides/create-project?hl=pt-br', '_blank');
  }

  return (
    <>
    <div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <ComponentCard title="Pesquisa de licitações">
            <div className="flex items-center gap-5">
              <Button size="md" variant="primary" onClick={fetchLicitations}>
                Busca rápida
              </Button>
              <Button size="md" variant="outline" onClick={showFilter} endIcon={!isOpenFilter ? <ChevronDownIcon /> : <ChevronUpIcon />}>
                Busca avançada
              </Button>
            </div>
            {isOpenFilter && (
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                  <Label>Pesquisa por termo</Label>
                  <Input defaultValue={term} type="text" placeholder="exemplo: Compra" onChange={(value) => handleSelectChange(value.target.value, 'term')} />
                </div>
                <div className="col-span-4">
                  <Label>Status</Label>
                  <div className="relative">
                    <Select
                    defaultValue={status}
                      options={statusOptions}
                      placeholder="Selecione um status"
                      onChange={(value) => handleSelectChange(value, 'status')}
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
                    defaultValue={modality}
                      options={modalityOptions}
                      placeholder="Selecione uma modalidade"
                      onChange={(value) => handleSelectChange(value, 'modality')}
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
                    defaultValue={realization}
                      options={realizationOptions}
                      placeholder="Selecione a realização"
                      onChange={(value) => handleSelectChange(value, 'realization')}
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
                    defaultValue={judgement}
                      options={judgementOptions}
                      placeholder="Selecione o julgamento"
                      onChange={(value) => handleSelectChange(value, 'judgement')}
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>
                {/* <div className="col-span-4">
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
                </div> */}
                <div className="col-span-4">
                  <Label>UF</Label>
                  <div className="relative">
                    <Select
                    defaultValue={uf}
                      options={ufOptions}
                      placeholder="Selecione a UF"
                      onChange={(value) => {console.log(value); handleSelectChange(value, 'uf')}}
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>

                <div className="col-span-12 flex flex-row-reverse gap-5" style={{ marginTop: '16px', justifyItems: 'end' }}>
                  <Button size="md" variant="primary" onClick={fetchLicitations}>
                    Buscar
                  </Button>
                  <Button disabled={isFilterValueSelected()} size="md" variant="outline" onClick={() => resetFilters()} endIcon={<CloseLineIcon />}>
                    Limpar campos
                  </Button>
                </div>
              </div>
            )}
          </ComponentCard>
        </div>
      </div>
      <div style={{ marginTop: '16px' }}>
        {data.length > 0
          ? (
            <div className="space-y-6">
              {data.map((element: any, index: number) => (
                <ComponentCard 
                title={`Processo Nº ${element.identificacao}`} 
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
                    <Button size="sm" variant="outline" startIcon={<PlugInIcon />} onClick={() => {openModal(); setItemSelectedForPreliminarReport(element)}}>
                      Gerar análise preliminar
                    </Button>
                  </div>
                )}>
                  <div className="flex flex-row items-center w-full gap-6 xl:flex-row" style={{justifyContent: 'space-between'}}>
                    <div>
                      <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                        {`${element.razaoSocial} - ${element.unidadeCompradora.uf}`}
                      </h4>
                      <div>
                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          Descrição
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          {element.resumo}
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left" style={{ marginTop: '16px' }}>
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Data de Publicação
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {formatDate(element.dataHoraPublicacao)}
                          </p>
                        </div>
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Abertura das Propostas
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {formatDate(element.dataHoraInicioPropostas)}
                          </p>
                        </div>
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Tipo
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {`${element.tipoLicitacao.tipoLicitacao} - ${element.tipoLicitacao.tipoJulgamento}`}
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
                        onClose={() => {}}
                        className="absolute right-12 mt-[49px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
                      >
                      

                        <ul className="flex flex-col gap-1 pt-4 pb-3 ">
                          <li>
                            <DropdownItem
                              onItemClick={() => downloadEdital(element)}
                              tag="button"
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
                  <BasicTableOne items={element.items} key={index} />
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
              Gerar relatório preliminar com IA
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              O relatório preliminar irá analisar os itens do edital selecionado, conforme o prompt previamente definido. O relatório identificará se o edital contém itens que obedecem as regras estabelecidas, fornecendo informações mais precisas sobre possíveis oportunidades de negócio.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
                <div>
                  <Label>API Key</Label>
                  <Input disabled={isLoadingReport} type="text" placeholder="Insira a sua Api Key para gerar o relatório preliminar" onChange={(value) => setApiKey(value.target.value)} />
                  <a className="text-gray-400 hover:text-blue-700" style={{ cursor: 'pointer', fontSize: '12px'}} onClick={oepnLink}>Não tenho minha Api Key</a>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button disabled={isLoadingReport} size="sm" variant="outline" onClick={closeModal}>
                Cancelar
              </Button>
              {!reportGeneratedSuccessfully.success 
              ? (
                <Button disabled={isLoadingReport || !apiKey} size="sm" onClick={() => generatePreReport()}>
                  {isLoadingReport ? 'Analisando dados...' : 'Gerar relatório'}
                </Button>
              ) : (
                <Button size="sm" onClick={() => window.location.href = 'google.com'}>
                  Visualizar relatório
                </Button>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}