"use client"

import ComponentCard from "@/components/common/ComponentCard";
import { useState } from "react";
import { Service } from "../service/service";
import Button from '@mui/material/Button';
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from '@mui/material/Box';
import TabOne from "./tabOne/TabOne";
import TabTwo from "./tabTwo/TabTwo";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Licitations() {
    const service: Service = new Service();
    const [apiKey, setApiKey] = useState<string>('');
    const [isLoadingReport, setIsLoadingReport] = useState<boolean>(false);
    const [fileSelected, setFileSelected] = useState<any>();
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    return (
        <div>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-12">
                    <ComponentCard title="Configurações">
                        <div className="col-span-12">
                            <div style={{ marginTop: '16px' }}>
                                <div className="space-y-6">
                                    <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs value={currentIndex} onChange={(_, index) => setCurrentIndex(index)} aria-label="basic tabs example">
                                                <Tab label="Api keys" {...a11yProps(0)} />
                                                <Tab label="Prompts" {...a11yProps(1)} />
                                            </Tabs>
                                        </Box>
                                        <TabOne value={currentIndex} index={0} />
                                        <TabTwo value={currentIndex} index={1} />
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