import { useCreateUser, useUpdateUser } from "@/ahooks/useUser"

import { FC } from "react"
import { useForm } from "react-hook-form"

import { AxiosError } from "axios"

import FormInput from "@/components/form/FormInput"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

import { UserSchema, IUserSchema } from "@/actions/client/userAction"

import { zodResolver } from "@hookform/resolvers/zod"

import { IUser, UserVariant } from "@/types/user"
import FormCalendar from "@/components/form/FormCalendar"
import { FormRadioGroup, TRadioItem } from "@/components/form/FormRadioGroup"

const radioItems: TRadioItem[] = [
  { value: "social", label: UserVariant.social },
  { value: "frinds", label: UserVariant.frinds },
  { value: "myself", label: UserVariant.myself },
]

type UserFormPropsType = {
  user?: IUser
  handleClose: () => void
  boardId?: string
}

export const UserForm: FC<UserFormPropsType> = (props: UserFormPropsType) => {
  const { user, handleClose, boardId } = props

  const form = useForm<IUserSchema>({
    mode: "onChange",
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      hear: user?.hear || "",
      birth: user?.birth
        ? new Date(new Date(user.birth as Date).setHours(0, 0, 0, 0))
        : new Date(new Date().setHours(0, 0, 0, 0)),
    },
  })

  const { formState, handleSubmit } = form
  const { mutateAsync: createUser, isPending: pendingUser } = useCreateUser()
  const { mutateAsync: updateUser, isPending: pendingUpdate } = useUpdateUser(
    user?.id || ""
  )
  const isPending = pendingUser || pendingUpdate

  function onSubmit(data: IUserSchema) {
    const dirtyFields = formState.dirtyFields

    const changedFields: IUserSchema = Object.keys(dirtyFields).reduce(
      (result, key) => {
        const value = data[key as keyof IUserSchema]

        if (value instanceof Date) {
          result[key as keyof Omit<IUserSchema, "birth">] = value.toISOString()
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          result[key as keyof IUserSchema] =
            value as IUserSchema[keyof IUserSchema]
        }

        return result
      },
      {} as IUserSchema
    )

    const dirtyFieldsAdd = { ...changedFields, boardId: boardId }
    const mutation = user ? updateUser : createUser

    mutation(dirtyFieldsAdd, {
      onSuccess: () => {
        handleClose()
        toast({
          title: "Success",
          description: `${user ? "Update" : "Create"} success`,
        })
      },
      onError: (error) => {
        const errorMessage =
          ((error as AxiosError)?.response?.data as { message: string })
            ?.message || "Unknown error"

        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
      },
    })
  }

  return (
    <div className="my-2  flex items-center justify-center gap-2">
      <Form {...form}>
        <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start justify-between gap-4">
            <FormInput name="name" placeholder="Name" />
            <FormInput name="email" placeholder="Email" />
            <div className=" py-[10px] flex gap-5 ">
              <FormCalendar name="birth" />
            </div>
            <div className="p-[10px] mt-2">
              <FormRadioGroup name="hear" radioItems={radioItems} />
            </div>
          </div>

          <div className="mt-[20px] flex max-w-[800px] justify-between">
            <Button variant="default_out" onClick={handleClose}>
              Cansel
            </Button>
            <Button
              type="submit"
              className=""
              disabled={
                isPending || user
                  ? !formState.isValid
                    ? true
                    : formState.isDirty
                    ? false
                    : true
                  : false
              }
            >
              Save user
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
