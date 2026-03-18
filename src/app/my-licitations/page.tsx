"use client"
import ComponentCard from "@/components/common/ComponentCard";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from "@mui/material/TextField";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AddIcon from '@mui/icons-material/Add';

import dayjs from "dayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import MobileStepper from "@mui/material/MobileStepper";
import { useTheme } from "@mui/material/styles";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function MyLicitations() {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [date, setDate] = useState<any>();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number,
    ) {
        return { name, calories, fat, carbs, protein };
    }
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];
    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const email = formJson.email;
        console.log(email);
        handleClose();
    };

    const [skipped, setSkipped] = useState(new Set<number>());

    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };



    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 space-y-6 xl:col-span-12">
                <ComponentCard title="Meus processos licitatórios" headerButton={
                    <Button startIcon={<AddIcon />} onClick={handleClickOpen}>
                        Novo processo
                    </Button>

                }>
                    <div className="flex justify-between gap-4 dark:text-amber-50!">
                        <TextField className="dark:text-amber-50!" fullWidth={true} id="filled-basic" label="Filled" variant="filled" />
                        <div>
                            <IconButton aria-label="delete" color="primary" onClick={() => setIsExpanded(!isExpanded)}>
                                {!isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}

                            </IconButton>
                        </div>
                    </div>
                    {isExpanded && (
                        <div className="flex align-bottom">
                            <FormControl variant="filled" sx={{ mr: 2, minWidth: 240 }}>
                                <InputLabel id="demo-simple-select-filled-label" className="dark:text-amber-50!">Status</InputLabel>
                                <Select
                                    className="dark:text-amber-50!"
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={age}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
                            {/* <DatePicker
                            label="Controlled picker"
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            /> */}
                        </div>

                    )}
                    <TableContainer component={Paper}>
                        <Table className="dark:bg-gray-800" sx={{ minWidth: 650 }} aria-label="caption table">
                            <TableHead>
                                <TableRow >
                                    <TableCell className="dark:text-white! dark:border-b-gray-800!" align="left">Processo</TableCell>
                                    <TableCell className="dark:text-white! dark:border-b-gray-800!" align="left">UASG</TableCell>
                                    <TableCell className="dark:text-white! dark:border-b-gray-800!" align="left">Status</TableCell>
                                    <TableCell className="dark:text-white! dark:border-b-gray-800!" align="left">Data do pregão</TableCell>
                                    <TableCell className="dark:text-white! dark:border-b-gray-800!" align="left">Qtd. Itens</TableCell>
                                    <TableCell className="dark:text-white! dark:border-b-gray-800!" align="left"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell className="dark:text-white! dark:border-b-gray-800!" component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left" className="dark:text-white! dark:border-b-gray-800!">{row.calories}</TableCell>
                                        <TableCell className="dark:text-white! dark:border-b-gray-800!" align="left">{row.fat}</TableCell>
                                        <TableCell className="dark:text-white! dark:border-b-gray-800!" align="left">{row.carbs}</TableCell>
                                        <TableCell className="dark:text-white! dark:border-b-gray-800!" align="left">{row.protein}</TableCell>
                                        <TableCell className="dark:text-white! dark:border-b-gray-800!" align="right">
                                            <div>
                                                <IconButton aria-label="delete" color="primary">
                                                    <SearchIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" color="error">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </ComponentCard>
            </div>
            <Dialog open={open} onClose={handleClose} maxWidth={'lg'} fullWidth={true}>
                <DialogTitle className="dark:bg-gray-800!">Subscribe</DialogTitle>
                <DialogContent className="dark:bg-gray-800!">
                    <DialogContentText>
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="subscription-form">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                    </form>
                </DialogContent>
                <DialogActions className=" dark:bg-gray-800! m-auto">
                    <MobileStepper
                        className="dark:bg-gray-800!"
                        variant="dots"
                        steps={6}
                        position="static"
                        activeStep={activeStep}
                        sx={{ width: 600 }}
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === 5} endIcon={<ChevronRightIcon />}>
                                Next
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0} startIcon={<ChevronLeftIcon />}>
                                Back
                            </Button>
                        }
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
}