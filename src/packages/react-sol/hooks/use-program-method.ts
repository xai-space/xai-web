import { Idl } from '@coral-xyz/anchor'
import { useProgram, type UseProgramOptions } from './use-program'

type UseProgramMethodOptions<IDL extends Idl> = UseProgramOptions<IDL>

// TODO: Waiting for implementation
export const useProgramMethod = <IDL extends Idl>({
  idl,
  programId,
}: UseProgramMethodOptions<IDL>) => {
  const {} = useProgram({ idl, programId })
  return {}
}
