import { service } from '../service/service';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePrompt = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => service.createPropmt(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['prompts']});
        }
    }); 
}