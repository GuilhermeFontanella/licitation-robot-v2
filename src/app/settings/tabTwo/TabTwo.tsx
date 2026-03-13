import { Service } from "@/app/service/service";
import ComponentCard from "@/components/common/ComponentCard";
import { CloseLineIcon, PencilIcon } from "@/icons";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useRef, useState } from "react";
import styles from '@/app/settings/tabTwo/styles.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from "@mui/material/Tooltip";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useCreatePrompt } from "@/app/hooks/userCreatePropmt";
import CircularProgress from "@mui/material/CircularProgress";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface IApiKey {
    id: number;
    value: string;
    user_id: string;
    description: string;
    createdAt: any;
}

const TabTwo = (props: TabPanelProps) => {
  const { mutate: createPrompt, isPending, isSuccess, isError } = useCreatePrompt();
  const service: Service = new Service();
  const { children, value, index, ...other } = props;
  const [storedPrompts, setStoredPrompts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  const descriptionElementRef = useRef<HTMLElement>(null);
  const [promptSelected, setPromptSelected] = useState<any | null>(null);
  const [inputDialog, setInputDialog] = useState<string>('');
  const [inputRuleTitle, setInputRuleTitle] = useState<string>('');
  const [openSnackBar, setOpenSnackBar] = useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Slide,
  });
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const getPrompts = async () => {
    setIsLoading(true);
    try {
        const response = await service.getPropmts();
        console.log(response)
        setStoredPrompts(response.filter(e => e.status !== 0));
    } catch (err: any) {
        throw Error(err);
    } finally {
        setIsLoading(false);
    }
  }

  const createNewPrompt = async () => {
    createPrompt({
      status: 1,
      user_id: "eu",
      nickname: inputRuleTitle,
      value: inputDialog,
      createdAt: new Date()
    }, {
      onSuccess: () => {
        setSnackbarMessage('Prompt salvo com sucesso');
        setOpenSnackBar({...openSnackBar, open: true});
        handleCloseDialog();
      },
      onError: () => {
        setSnackbarMessage('Ocorreu um erro ao salvar o prompt');
        setOpenSnackBar({...openSnackBar, open: true});
      }
    });    
  }

  const updatePrompts = async () => {
    if (!promptSelected) return createNewPrompt();

    setIsLoading(true);
    try {
      const id = promptSelected.id;
      const response = await service.updatePropmts(String(id), {...promptSelected, nickname: inputRuleTitle, value: inputDialog});
      setSnackbarMessage("Prompt salvo com sucesso!")
      setOpenSnackBar({...openSnackBar, open: true});
      getPrompts();
      handleCloseDialog();
      return response;
    } catch (err: any) {
      throw Error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPrompts();
  }, []);

   const handleCloseSnackbar = () => {
    setOpenSnackBar({
      ...openSnackBar,
      open: false,
    });
  };

  const handleClickOpenDialog = (prompt: any) => {
    setOpenDialog(true);
    setScroll('paper');
    setPromptSelected(prompt);
    setInputDialog(prompt.value);
    setInputRuleTitle(prompt.nickname)
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const handleDeleteRule = async (rule: any) => {
    setIsLoading(true);
    try {
      const id = rule.id;
      const response = await service.updatePropmts(String(id), {...promptSelected, status: 0});
      setSnackbarMessage("Prompt excluído com sucesso!")
      setOpenSnackBar({...openSnackBar, open: true});
      getPrompts();
      handleCloseDialog();
      return response;
    } catch (err: any) {
      throw Error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (openDialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openDialog]);

  const openDialogNewPropmpt = () => {
    setOpenDialog(true);
  }

  return (
    <>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <div style={{marginBottom: '-16px', marginTop: '16px'}}>
          <Tooltip title="Criar novo prompt">
            <IconButton aria-label="delete" onClick={openDialogNewPropmpt}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
        {
          value === index && (
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              {storedPrompts.map((e: any) => (
                <Grid size={6} key={e.id}>
                  <ComponentCard 
                    title={e.nickname} 
                    key={0}
                    headerButton={
                    
                      <div className="flex items-center gap-5">
                          <IconButton aria-label="delete" onClick={() => handleClickOpenDialog(e)}>
                            <PencilIcon />
                          </IconButton>
                          <IconButton aria-label="delete" onClick={() => handleDeleteRule(e)}>
                            <DeleteIcon />
                          </IconButton>
                      </div>
                    
                    }>
                      <div className={`${styles.prompCard} flex flex-row grid grid-cols-12 justify-between items-center w-full gap-6 xl:flex-row`}>
                        <div className="col-span-12">
                          <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                              Descrição
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                              {e.value}
                            </p>
                          </div>

                        </div>
                      </div>
                    </ComponentCard>
                </Grid>
              ))}
              </Grid>
            </Box>
          )}
          <Snackbar
          open={openSnackBar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          slots={{ transition: openSnackBar.Transition}}
          action={
              <IconButton aria-label="edit-button" color="inherit" onClick={() => setOpenSnackBar({...openSnackBar, open: false})}>
                  <CloseLineIcon />
              </IconButton>
          }
        />
      </div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth={'lg'}
      >
        <DialogTitle id="scroll-dialog-title">
          {!promptSelected ? 'Criar Novo Prompt' : null}
        </DialogTitle>
        <DialogTitle id="scroll-dialog-title">
          <TextField 
          fullWidth={true} 
          defaultValue={promptSelected?.nickname} 
          id="filled-basic" 
          label="Apelido" 
          variant="filled" 
          onChange={(value) => {
            setInputRuleTitle(value.target.value)
          }} />
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            style={{width: '800px'}}
          >
            <TextField style={{width: '100%'}}
              id="filled-textarea"
              label="Prompt"
              placeholder="Insira o seu prompt aqui"
              multiline
              variant="filled"
              value={inputDialog}
              fullWidth={true}
              onChange={(value) => setInputDialog(value.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton aria-label="delete" type='button' color='warning' onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={updatePrompts} color='success' disabled={!inputDialog || !inputRuleTitle}>
              {isLoading ? (<CircularProgress />) : <CheckIcon />}
            </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TabTwo;