"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactFormInputs {
    name: string;
    email: string;
    phone: string;
    description: string;
}

const ContactForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormInputs>();

    const onSubmit = async (data: ContactFormInputs) => {
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                alert("Message sent successfully!");
            } else {
                alert("Something went wrong!");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Error sending message. Please try again later.");
        }
    };

    return (
        <form onSubmit={ handleSubmit(onSubmit) } className="space-y-4 max-w-lg mx-auto">
            <Input
                { ...register("name", { required: "Name is required" }) }
                placeholder="Your Name"
                className="w-full"
            />
            { errors.name && <p className="text-red-500">{ errors.name.message }</p> }

            <Input
                { ...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" }
                }) }
                placeholder="Your Email"
                className="w-full"
            />
            { errors.email && <p className="text-red-500">{ errors.email.message }</p> }

            <Input
                { ...register("phone", { required: "Phone number is required" }) }
                placeholder="Your Phone Number"
                className="w-full"
            />
            { errors.phone && <p className="text-red-500">{ errors.phone.message }</p> }

            <Textarea
                { ...register("description", { required: "Description is required" }) }
                placeholder="Your Message"
                className="w-full"
            />
            { errors.description && <p className="text-red-500">{ errors.description.message }</p> }

            <Button type="submit" className="w-full" disabled={ isSubmitting }>
                { isSubmitting ? "Sending..." : "Send Message" }
            </Button>
        </form>
    );
};

export default ContactForm;
