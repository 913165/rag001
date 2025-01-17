'use client'

import React, { useState } from 'react';
import { steps } from './constants/steps/steps';
import { Card, CardContent } from '@/components/ui/card';


export const RAGStepsUI: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">RAG Implementation</h2>
                    <nav className="space-y-1">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveStep(index)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${index === activeStep
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`} >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-sm font-medium">{step.title}</span>
                                </button>
                            )
                        }
                        )
                        }
                    </nav>
                </div>
            </div>
            {/* Main content */}
            <div className="flex-1 overflow-y-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">{steps[activeStep].title}</h1>
                    <p className="text-gray-600 mt-2">{steps[activeStep].content.overview}</p>
                </div>
                {/* Implementation sections */}
                <div className="space-y-6">
                     {steps[activeStep].content.implementation && steps[activeStep].content.implementation.map((impl, index) => (
                            <Card key={index}>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                       
                                        <h3 className="text-xl font-semibold">{impl.title}</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">{impl.description}</p>
                                    {impl.component ? impl.component : (
                                        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                            <pre className="text-gray-100">
                                              
                                            </pre>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                </div>
            </div>
        </div>
    );
};

