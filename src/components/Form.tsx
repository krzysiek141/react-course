import { FormEvent, useRef } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    name: z.string().min(3, { message: 'my custom error message'}),
    age: z.number({ invalid_type_error: 'Age field is required'}).min(18)
})

type FormData = z.infer<typeof schema>

export function Form() {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({ resolver: zodResolver(schema) })

    const onSubmit = (data: FieldValues) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input {...register('name')} id="name" type="text" className="form-control" />
            </div>
            {errors.name && <p className='text-danger'>{errors.name.message}</p>}
            <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input {...register('age', {valueAsNumber: true})} id="age" type="number" className="form-control" />
            </div>
            {errors.age && <p className='text-danger'>{errors.age.message}</p>}
            <button disabled={!isValid} className="btn btn-primary" type="submit">Submit</button>
        </form>
    )
}



