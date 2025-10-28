"use client"

import ComponentCard from "@/components/common/ComponentCard";
import { useState } from "react";
import { Service } from "../service/service";
import Button from '@mui/material/Button';

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