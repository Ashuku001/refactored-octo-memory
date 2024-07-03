'use client'
import {useEffect } from 'react';
import { InputElement } from "@/types"
import HTMLReactParser from "html-react-parser"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from '@/components/ui/input'
type Props = {
	dynamic: any;
	form: any;
	messageRef: any;
}

function DynamicBody({ dynamic, form, messageRef }: Props) {
	let variables: string[] = []
	for (let i = 0; i < dynamic?.inputs?.length; i++) {
		variables.push(`var${i}`)
	}

	const register = form.register
	const watchFields = form.watch(variables)

	let text = dynamic?.content?.text
	if (dynamic?.content?.text?.match(/\{\{\d\}\}/g).length !== 0) {
		let theArray;
		const rgx = /\{\{\d\}\}/g
		let i = 0
		while((theArray = rgx.exec(dynamic?.content?.text)) !== null) {
			text = text?.replace(theArray[0], `<span className='text-green-400'> ${watchFields[i] == undefined ? '' : watchFields[i]} </span>`)
			i++
		}
	}
	useEffect(() => {
		let message = dynamic?.content?.text
		if (dynamic?.content?.text?.match(/\{\{\d\}\}/g).length !== 0) {
			let theArray;
			const rgx = /\{\{\d\}\}/g
			let i = 0
			while((theArray = rgx.exec(dynamic?.content?.text)) !== null) {
				message = message?.replace(theArray[0],  watchFields[i] == undefined ? '' : watchFields[i])
				i++
			}
		}
		if(messageRef){
			messageRef.current = message
		}
	},[dynamic?.content?.text, messageRef, watchFields])

	return (
		<div>
			{dynamic?.content &&
				dynamic?.content?.type === 'BODY' &&
				<p id='message' ref={messageRef}>{HTMLReactParser(text)}</p>
			}
			{dynamic?.inputs?.length !== 0 &&
				<>
					{dynamic?.inputs?.map((input: InputElement, i: number) => (
						<div key={i} className=" mb-2">
							<FormField
								control={form.control}
								name={input?.name}
								render={({ field }) => (
									<FormItem >
										<div className='flex flex-col w-full'>
											<div className="flex items-center space-x-2 w-full">
												<FormLabel htmlFor={input?.name}>{input?.label}</FormLabel>
												<FormControl>
													<Input
														autoComplete="do-not-autofill"
														type={input.type}
														id={input?.id}
														placeholder={input?.placeholder}
														{...field}
														value={field.value}
														onChange={(e) => field.onChange(e)}
														{...register(variables[i], {required:true})}
														className="bg-slate-200 dark:bg-gray-700 rounded-sm px-1 py-1 outline-none w-full flex-1 pr-2 cursor-auto mb-2"
													/>
												</FormControl>
											</div>
											<FormMessage />
										</div>
									</FormItem>
								)}
							/>
						</div>
					))}
				</>
			}
		</div>
	)
}

export default DynamicBody