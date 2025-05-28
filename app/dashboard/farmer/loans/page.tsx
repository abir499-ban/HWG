"use client"

import { getStatusColor, formatCurrency } from '@/utils/loan_stat_functions'
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useSession } from 'next-auth/react'
import {  FileText, Search, Clock, CheckCircle, XCircle, AlertCircle, Upload, ExternalLink } from "lucide-react"
import { demoloanApplications } from '@/constants/demodata'
import LoanStats from '@/components/shared/LoanStats'
import { LoanApplicationType } from '@/utils/LoanRequest.schema'




export const getStatusIcon = (status: string) => {
    switch (status) {
        case "Approved":
            return <CheckCircle className="h-4 w-4 text-green-600" />
        case "Rejected":
            return <XCircle className="h-4 w-4 text-red-600" />
        case "Pending":
            return <Clock className="h-4 w-4 text-yellow-600" />
        case "Under Review":
            return <AlertCircle className="h-4 w-4 text-blue-600" />
        case "Document Required":
            return <FileText className="h-4 w-4 text-orange-600" />
        default:
            return <Clock className="h-4 w-4 text-gray-600" />
    }
}



export default function Component() {
    const { data } = useSession()
    const [loanApplications, setloanApplications] = useState<LoanApplicationType[]>(demoloanApplications)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all") 
    const [activeTab, setActiveTab] = useState("all")

    const filteredApplications = loanApplications.filter((application : LoanApplicationType) => {
        const matchesSearch =
            application.lenderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.purpose.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || application.status === statusFilter
        const matchesTab = activeTab === "all" || application.status === activeTab

        return matchesSearch && matchesStatus && matchesTab
    })

    const stats = {
        total: loanApplications.length,
        pending: loanApplications.filter((a) => a.status === "Pending").length,
        approved: loanApplications.filter((a) => a.status === "Approved").length,
        rejected: loanApplications.filter((a) => a.status === "Rejected").length,
        totalAmount: loanApplications.reduce((sum, a) => sum + a.loanAmount, 0),
        approvedAmount: loanApplications.filter((a) => a.status === "Approved").reduce((sum, a) => sum + a.loanAmount, 0),
    }

    useEffect(() => {
        const fetchLoansOfFarmer = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/farmer/loans/${data?.digitalID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${data?.accessToken}`
                    }
                })
                const response = await res.json();
                if(res.ok && response){
                    setloanApplications(response)
                }
                else{
                    console.log("Error")
                }
            } catch (error) {
                console.log("Error")
            }
        }
        fetchLoansOfFarmer()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-l from-green-200/50 to-white/80 p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-green-500">My Loan Applications</h1>
                        <p className="text-muted-foreground">Track and manage your loan applications across different lenders</p>
                    </div>
                    {/* <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button> */}
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <LoanStats loanApplications={loanApplications} stats={stats} />
                </div>

                {/* Filters and Search */}
                <Card>
                    <CardHeader>
                        <CardTitle>Loan Applications</CardTitle>
                        <CardDescription>Monitor the progress of your loan applications</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="flex flex-1 items-center space-x-2">
                                <Search className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by lender, ID, or purpose..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="max-w-sm"
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Under Review">Under Review</SelectItem>
                                    <SelectItem value="Document Required">Documents Required</SelectItem>
                                    <SelectItem value="Approved">Approved</SelectItem>
                                    <SelectItem value="Rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList className="flex flex-wrap justify-center gap-2 mb-5">
                        <TabsTrigger value="all">All Applications</TabsTrigger>
                        <TabsTrigger value="Pending">Pending</TabsTrigger>
                        <TabsTrigger value="Under Review">Under Review</TabsTrigger>
                        <TabsTrigger value="Document Required">Action Required</TabsTrigger>
                        <TabsTrigger value="Approved">Approved</TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="md:space-y-4">
                        <div className="grid gap-4">
                            {filteredApplications.map((application) => (
                                <Card key={application.id} className="overflow-hidden">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                                            {/* Left Section - Basic Info */}
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={application.lenderLogo || "/placeholder.svg"}
                                                    alt={application.lenderName}
                                                    className="h-12 w-12 rounded-lg border bg-white p-2"
                                                />
                                                <div>
                                                    <h3 className="font-semibold">{application.lenderName}</h3>
                                                    <p className="text-sm text-muted-foreground">Application ID: {application.id}</p>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        {getStatusIcon(application.status)}
                                                        <Badge className={getStatusColor(application.status)}>
                                                            {application.status.replace("_", " ").toUpperCase()}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Middle Section - Loan Details */}
                                            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                                                <div>
                                                    <p className="text-sm font-medium text-muted-foreground">Amount</p>
                                                    <p className="text-lg font-semibold">{formatCurrency(application.loanAmount)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-muted-foreground">Purpose</p>
                                                    <p className="text-sm">{application.purpose}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-muted-foreground">Interest Rate</p>
                                                    <p className="text-sm">{application.requestedInterestRate ? `${application.requestedInterestRate}%` : "TBD"}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-muted-foreground">Term</p>
                                                    <p className="text-sm">{application.term} months</p>
                                                </div>
                                            </div>

                                            {/* Right Section - Actions */}
                                            <div className="flex flex-col space-y-2 lg:items-end">
                                                <div className="flex space-x-2">

                                                    <Button variant="outline" size="sm">
                                                        <ExternalLink className="mr-2 h-4 w-4" />
                                                        Visit the Banking Page
                                                    </Button>

                                                    {application.status === "Document Required" && (
                                                        <Button size="sm">
                                                            <Upload className="mr-2 h-4 w-4" />
                                                            Upload Docs
                                                        </Button>
                                                    )}
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Last updated: {new Date(application.lastUpdated).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Progress Section */}
                                        <div className="mt-4 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium">Application Progress</p>
                                                <p className="text-sm text-muted-foreground">{application.progress}%</p>
                                            </div>
                                            <Progress value={application.progress} className="h-2" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {filteredApplications.length === 0 && (
                            <Card>
                                <CardContent className="flex h-24 items-center justify-center text-muted-foreground">
                                    No loan applications found matching your criteria.
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
