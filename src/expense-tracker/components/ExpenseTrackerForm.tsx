import { FieldValues, useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'

const minDescriptionLength = 3
const schema = z.object({
    description: z.string().min(minDescriptionLength, { message: `Description should be at least ${minDescriptionLength} long`}).max(50),
    amount: z.number({ invalid_type_error: 'Amount is required'}).min(0.01),
    category: z.string()
})

type FormData = z.infer<typeof schema>
interface Props {
    availableCategories: string[],
    onSubmit: (data: FieldValues) => void
}


export function ExpenseTrackerForm( {availableCategories, onSubmit}: Props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ resolver: zodResolver(schema) })

    return (
        <form className="mb-5" onSubmit={handleSubmit((formData) => {onSubmit(formData);reset()})}>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input {...register('description')} id="description" type="text" className="form-control" />
            </div>
            {errors.description && <p className='text-danger'>{errors.description.message}</p>}
            <div className="mb-3">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input {...register('amount', {valueAsNumber: true})} id="amount" type="number" className="form-control" />
            </div>
            {errors.amount && <p className='text-danger'>{errors.amount.message}</p>}
            <label  htmlFor="category" className="form-label">Category</label>
            <select {...register('category')} className="form-select mb-3" id="category">
                {availableCategories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
            {errors.category && <p className='text-danger'>{errors.category.message}</p>}
            
            <button className="btn btn-primary" type="submit">Submit</button>
        </form>
    )
}
