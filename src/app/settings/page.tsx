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

    return (
        <div>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-12">
                    <ComponentCard title="Configurações">
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
                                                    <div>
                                                        <Label>API Key</Label>
                                                        <Input disabled={isLoadingReport} type="text" placeholder="Insira a sua Api Key para gerar o relatório completo" onChange={(value) => setApiKey(value.target.value)} />
                                                        <a className="text-gray-400 hover:text-blue-700" style={{ cursor: 'pointer', fontSize: '12px'}} onClick={() => {}}>Não tenho minha Api Key</a>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <Label>Edital</Label>
                                                    <FileInput onChange={(event) => event.target.files ? setFileSelected(event.target.files[0]) : null} />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                                            {
                                                <Button disabled={isLoadingReport || !apiKey || !fileSelected} size="sm" onClick={() => {}}>
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



/**
 * import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import PricingCalculator from "./PricingCalculator";
import { Building2, User, FileText, MapPin } from "lucide-react";

interface ProposalFormProps {
  onSubmit?: (data: any) => void;
  onPreview?: (data: any) => void;
  initialData?: any;
}

const ProposalForm = ({
  onSubmit = () => {},
  onPreview = () => {},
  initialData = {
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    propertyAddress: "",
    propertySize: 100,
    propertyType: "Residencial",
    propertyLocation: "Urbano",
    serviceScope: "",
    additionalNotes: "",
  },
}: ProposalFormProps) => {
  const [formData, setFormData] = React.useState(initialData);
  const [calculatedPrice, setCalculatedPrice] = React.useState(1000);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    onPreview({ ...formData, [name]: value });
  };

  const handlePriceCalculated = (price: number) => {
    setCalculatedPrice(price);
    setFormData((prev) => ({
      ...prev,
      calculatedPrice: price,
    }));
    onPreview({ ...formData, calculatedPrice: price });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, calculatedPrice });
  };

  return (
    <Card className="p-6 bg-white w-full max-w-[700px] h-[900px]">
      <ScrollArea className="h-full pr-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="client" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="client">Dados do Cliente</TabsTrigger>
              <TabsTrigger value="property">Detalhes do Imóvel</TabsTrigger>
              <TabsTrigger value="service">Detalhes do Serviço</TabsTrigger>
            </TabsList>

            <TabsContent value="client" className="space-y-4 mt-4">
              <div className="flex items-center gap-2 mb-4">
                <User className="text-primary" />
                <h3 className="text-lg font-semibold">
                  Informações do Cliente
                </h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientName">Nome Completo</Label>
                <Input
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  placeholder="Digite o nome completo do cliente"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientEmail">Email</Label>
                <Input
                  id="clientEmail"
                  name="clientEmail"
                  type="email"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  placeholder="Digite o email do cliente"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientPhone">Telefone</Label>
                <Input
                  id="clientPhone"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleInputChange}
                  placeholder="Digite o telefone do cliente"
                />
              </div>
            </TabsContent>

            <TabsContent value="property" className="space-y-4 mt-4">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="text-primary" />
                <h3 className="text-lg font-semibold">Detalhes do Imóvel</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyAddress">Endereço do Imóvel</Label>
                <Input
                  id="propertyAddress"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleInputChange}
                  placeholder="Digite o endereço do imóvel"
                />
              </div>

              <PricingCalculator
                propertySize={formData.propertySize}
                propertyType={formData.propertyType}
                location={formData.propertyLocation}
                onPriceCalculated={handlePriceCalculated}
              />
            </TabsContent>

            <TabsContent value="service" className="space-y-4 mt-4">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="text-primary" />
                <h3 className="text-lg font-semibold">Detalhes do Serviço</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceScope">Escopo do Serviço</Label>
                <Textarea
                  id="serviceScope"
                  name="serviceScope"
                  value={formData.serviceScope}
                  onChange={handleInputChange}
                  placeholder="Descreva o escopo do serviço de avaliação"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Observações Adicionais</Label>
                <Textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  placeholder="Quaisquer observações ou requisitos adicionais"
                  className="min-h-[100px]"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="pt-6 flex gap-4">
            <Button type="submit" className="flex-1">
              Gerar Proposta
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onPreview(formData)}
              className="flex-1"
            >
              Visualizar
            </Button>
          </div>
        </form>
      </ScrollArea>
    </Card>
  );
};

export default ProposalForm;
 */